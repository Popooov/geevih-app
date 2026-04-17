<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ResourceResource\Pages;
use App\Models\Resource as ContentResource;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Radio;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class ResourceResource extends Resource
{
    protected static ?string $model = ContentResource::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'Contenido';
    protected static ?string $modelLabel = 'Recurso';
    protected static ?string $pluralModelLabel = 'Recursos';
    protected static ?int $navigationSort = 30;

    public static function pdfUrl(?string $fileUrl): ?string
    {
        if (! $fileUrl) {
            return null;
        }

        if (str_starts_with($fileUrl, 'http://') || str_starts_with($fileUrl, 'https://')) {
            return $fileUrl;
        }

        $cloud = env('CLOUDINARY_CLOUD_NAME');
        $publicId = preg_replace('/\.pdf$/i', '', ltrim($fileUrl, '/'));

        return "https://res.cloudinary.com/{$cloud}/raw/upload/{$publicId}.pdf";
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('title')
                ->label('Título')
                ->required()
                ->maxLength(255),

            Select::make('type')
                ->label('Tipo')
                ->options([
                    'guias' => 'Guías',
                    'protocolos' => 'Protocolos',
                    'herramientas' => 'Herramientas Prácticas',
                    'biblioteca' => 'Biblioteca de Artículos Científicos',
                    'material' => 'Material de Apoyo al Paciente',
                    'enlaces' => 'Enlaces de Interés',
                ])
                ->required()
                ->live()
                ->afterStateUpdated(function (callable $set, $state) {
                    if ($state === 'enlaces') {
                        $set('access_mode', 'url');
                        $set('file_tmp', null);
                        $set('file_url', null);
                    }
                }),

            Textarea::make('summary')
                ->label('Descripción breve')
                ->rows(3)
                ->columnSpanFull(),

            Toggle::make('is_pinned')
                ->label('Fijar recurso')
                ->helperText('Se mostrará en primer lugar en los listados')
                ->default(false)
                ->live(),

            TextInput::make('pin_order')
                ->label('Orden de fijado')
                ->numeric()
                ->nullable()
                ->visible(fn (callable $get) => (bool) $get('is_pinned')),

            Radio::make('access_mode')
                ->label('Modo de acceso')
                ->options([
                    'file' => 'Subir PDF',
                    'url' => 'Usar URL externa',
                ])
                ->default('file')
                ->required()
                ->visible(fn (callable $get) => $get('type') !== 'enlaces')
                ->dehydrated(fn (callable $get) => $get('type') !== 'enlaces')
                ->live(),

            TextInput::make('link_url')
                ->label('Enlace (URL)')
                ->url()
                ->nullable()
                ->visible(fn (callable $get) =>
                    $get('type') === 'enlaces' || $get('access_mode') === 'url'
                )
                ->required(fn (callable $get) =>
                    $get('type') === 'enlaces' || $get('access_mode') === 'url'
                ),

            FileUpload::make('file_tmp')
                ->label('Archivo (PDF)')
                ->disk('public')
                ->directory('tmp/resources')
                ->acceptedFileTypes(['application/pdf'])
                ->preserveFilenames(false)
                ->multiple(false)
                ->storeFiles(true)
                ->nullable()
                ->dehydrated(fn ($state) => filled($state))
                ->default(null)
                ->visible(fn (callable $get) =>
                    $get('type') !== 'enlaces' && $get('access_mode') === 'file'
                ),

            Placeholder::make('file_link')
                ->label('Documento actual')
                ->content(fn ($record) => filled($record?->file_url)
                    ? new HtmlString('
                        <a
                            href="' . e(self::pdfUrl($record->file_url)) . '"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-500"
                        >
                            Abrir PDF
                        </a>
                    ')
                    : '—'
                )
                ->visible(fn ($record, callable $get) =>
                    filled($record?->file_url)
                    && $get('type') !== 'enlaces'
                    && $get('access_mode') === 'file'
                ),

            FileUpload::make('image_url')
                ->label('Imagen / logo')
                ->image()
                ->disk('cloudinary')
                ->directory('resources/images')
                ->acceptedFileTypes(['image/*'])
                ->preserveFilenames(false)
                ->openable()
                ->downloadable()
                ->nullable()
                ->required(fn (callable $get) => $get('type') === 'enlaces')
                ->dehydrated(true),

            DatePicker::make('published_at')
                ->label('Fecha de publicación')
                ->native(false)
                ->displayFormat('Y-m-d')
                ->placeholder('YYYY-MM-DD'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('published_at', 'desc')
            ->columns([
                IconColumn::make('is_pinned')
                    ->label('Fijado')
                    ->boolean(),

                TextColumn::make('title')
                    ->label('Título')
                    ->searchable()
                    ->limit(50),

                TextColumn::make('type')
                    ->label('Tipo')
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'guias' => 'Guías',
                        'protocolos' => 'Protocolos',
                        'herramientas' => 'Herramientas',
                        'biblioteca' => 'Biblioteca',
                        'material' => 'Material',
                        'enlaces' => 'Enlaces',
                        default => ucfirst((string) $state),
                    }),

                TextColumn::make('access_mode')
                    ->label('Acceso')
                    ->formatStateUsing(fn ($state, $record) =>
                        $record->type === 'enlaces'
                            ? 'URL'
                            : ($state === 'url' ? 'URL' : 'PDF')
                    ),

                TextColumn::make('pin_order')
                    ->label('Orden')
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('published_at')
                    ->label('Fecha')
                    ->date('Y-m-d')
                    ->sortable(),

                ImageColumn::make('image_url')
                    ->label('Imagen')
                    ->disk('cloudinary')
                    ->toggleable(),

                TextColumn::make('link_url')
                    ->label('Enlace')
                    ->url(fn ($record) => $record?->link_url ?: null)
                    ->openUrlInNewTab()
                    ->limit(30)
                    ->toggleable(),

                TextColumn::make('file_url')
                    ->label('Archivo')
                    ->formatStateUsing(fn ($state) => $state ? 'Abrir PDF' : '—')
                    ->url(fn ($record) => $record?->file_url ? self::pdfUrl($record->file_url) : null)
                    ->openUrlInNewTab()
                    ->toggleable(),

                TextColumn::make('created_at')
                    ->label('Creado')
                    ->dateTime()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->label('Actualizado')
                    ->dateTime()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),

                Tables\Filters\SelectFilter::make('type')
                    ->label('Tipo')
                    ->options([
                        'guias' => 'Guías',
                        'protocolos' => 'Protocolos',
                        'herramientas' => 'Herramientas',
                        'biblioteca' => 'Biblioteca',
                        'material' => 'Material',
                        'enlaces' => 'Enlaces',
                    ]),

                Tables\Filters\TernaryFilter::make('is_pinned')
                    ->label('Fijados'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\RestoreAction::make(),
                Tables\Actions\ForceDeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListResources::route('/'),
            'create' => Pages\CreateResource::route('/create'),
            'edit' => Pages\EditResource::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }

    public static function uploadPdfToCloudinary(mixed $value, ?string $publicId = null): ?string
    {
        if (is_array($value)) {
            $value = Arr::first($value);
        }

        if ($value instanceof TemporaryUploadedFile) {
            $value = $value->store('tmp/resources', 'public');
        }

        if (is_array($value)) {
            $value = $value['path'] ?? $value['file'] ?? $value['tmp'] ?? null;
        }

        if (! is_string($value) || $value === '') {
            return null;
        }

        $absolute = Storage::disk('public')->path($value);

        if (! file_exists($absolute)) {
            return null;
        }

        $publicId = $publicId ?: ('resources/' . (string) Str::ulid());

        Cloudinary::uploadApi()->upload($absolute, [
            'resource_type' => 'raw',
            'public_id' => $publicId,
            'overwrite' => true,
            'invalidate' => true,
        ]);

        Storage::disk('public')->delete($value);

        return $publicId;
    }
}
