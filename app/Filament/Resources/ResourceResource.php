<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ResourceResource\Pages;
use App\Models\Resource as ContentResource;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Illuminate\Support\Facades\Storage;

class ResourceResource extends Resource
{
    protected static ?string $model = ContentResource::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
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
                    ->reactive(),

                Textarea::make('summary')
                    ->label('Descripción breve')
                    ->rows(3)
                    ->columnSpanFull(),

                TextInput::make('link_url')
                    ->label('Enlace (URL)')
                    ->url()
                    ->visible(fn (callable $get) => $get('type') === 'enlaces')
                    ->required(fn (callable $get) => $get('type') === 'enlaces'),

                FileUpload::make('file_url')
                    ->label('Archivo (PDF / Documentos)')
                    ->disk('cloudinary')
                    ->directory('resources')
                    ->acceptedFileTypes(['application/pdf'])
                    ->preserveFilenames(false)
                    ->openable()
                    ->downloadable()
                    ->nullable()
                    ->visible(fn (callable $get) => $get('type') !== 'enlaces'),

                FileUpload::make('image_url')
                    ->label('Imagen (miniatura)')
                    ->image()
                    ->disk('cloudinary')
                    ->directory('resources/images')
                    ->acceptedFileTypes(['image/*'])
                    ->preserveFilenames(false)
                    ->openable()
                    ->downloadable()
                    ->nullable()
                    ->visible(fn (callable $get) => $get('type') !== 'enlaces'),

                DatePicker::make('published_at')
                    ->label('Fecha de publicación')
                    ->native(false)
                    ->displayFormat('Y-m-d')
                    ->placeholder('YYYY-MM-DD'),
            ]);
    }

    /**
     * Antes de crear: si el tipo es 'enlaces' limpiamos file/image para no guardar uploads.
     */
    public static function mutateFormDataBeforeCreate(array $data): array
    {
        if (($data['type'] ?? null) === 'enlaces') {
            $data['file_url'] = null;
            $data['image_url'] = null;
        }
        return $data;
    }

    /**
     * Antes de guardar (create/update): si cambiamos a 'enlaces' intentamos borrar ficheros previos y limpiamos.
     */
    public static function mutateFormDataBeforeSave(array $data): array
    {
        if (($data['type'] ?? null) === 'enlaces') {
            // Si vienen valores temporales (por seguridad) los anulamos
            if (! empty($data['file_url'])) {
                try {
                    Storage::disk('cloudinary')->delete($data['file_url']);
                } catch (\Throwable $e) {
                    logger()->warning('Failed to delete cloudinary file on type change', ['file' => $data['file_url'], 'err' => $e->getMessage()]);
                }
                $data['file_url'] = null;
            }
            if (! empty($data['image_url'])) {
                try {
                    Storage::disk('cloudinary')->delete($data['image_url']);
                } catch (\Throwable $e) {
                    logger()->warning('Failed to delete cloudinary image on type change', ['image' => $data['image_url'], 'err' => $e->getMessage()]);
                }
                $data['image_url'] = null;
            }
        }

        return $data;
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Título')
                    ->searchable()
                    ->limit(50),

                TextColumn::make('type')
                    ->label('Tipo')
                    ->formatStateUsing(fn($state) => ucfirst((string) $state)),

                TextColumn::make('published_at')
                    ->label('Fecha')
                    ->date('Y-m-d')
                    ->sortable(),

                // Miniatura: resuelve vía disco cloudinary
                ImageColumn::make('image_url')
                    ->label('Imagen')
                    ->disk('cloudinary')
                    // visible solo si existe record y no es 'enlaces'
                    ->visible(fn ($record) => $record && ($record->type ?? '') !== 'enlaces')
                    ->toggleable(),

                TextColumn::make('link_url')
                    ->label('Enlace')
                    ->url(fn ($record) => $record?->link_url ?? null)
                    ->openUrlInNewTab()
                    ->visible(fn ($record) => $record && ($record->type ?? '') === 'enlaces'),

                TextColumn::make('file_url')
                    ->label('Archivo')
                    ->wrap(false)
                    ->url(fn ($record) => is_string($record?->file_url ?? null) && str_starts_with($record->file_url, 'http') ? $record->file_url : null)
                    ->openUrlInNewTab()
                    ->visible(fn ($record) => $record && ($record->type ?? '') !== 'enlaces'),

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
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListResources::route('/'),
            'create' => Pages\CreateResource::route('/create'),
            'edit' => Pages\EditResource::route('/{record}/edit'),
        ];
    }
}
