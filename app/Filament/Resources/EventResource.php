<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Models\Event;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Storage;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;
    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';
    protected static ?string $navigationGroup = 'Contenido';
    protected static ?string $modelLabel = 'Evento';
    protected static ?string $pluralModelLabel = 'Eventos';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Evento')
                ->schema([
                    Forms\Components\TextInput::make('title')
                        ->label('Título')
                        ->required()
                        ->maxLength(255)
                        ->live(onBlur: true)
                        ->afterStateUpdated(function ($state, Forms\Set $set, Forms\Get $get) {
                            if (! $get('slug')) {
                                $set('slug', \Illuminate\Support\Str::slug($state));
                            }
                        }),

                    Forms\Components\Select::make('event_category_id')
                        ->label('Categoría de formación')
                        ->relationship('category', 'name', fn ($query) => $query->where('is_active', true)->orderBy('sort_order'))
                        ->searchable()
                        ->preload()
                        ->nullable()
                        ->helperText('Clasifica el contenido en Cursos, Webinars, Congresos / Jornadas, Material Docente o Aval de GEEVIH.'),
                    Forms\Components\TextInput::make('slug')
                        ->label('Slug')
                        ->required()
                        ->maxLength(255)
                        ->helperText('Se ajustará automáticamente si ya existe.'),

                    Forms\Components\DateTimePicker::make('start_at')
                        ->label('Inicio')
                        ->required()
                        ->seconds(false),

                    Forms\Components\DateTimePicker::make('end_at')
                        ->label('Fin')
                        ->seconds(false)
                        ->nullable()
                        ->rule('after_or_equal:start_at'),

                    Forms\Components\Toggle::make('is_online')
                        ->label('Online')
                        ->default(false)
                        ->live(),

                    Forms\Components\TextInput::make('location')
                        ->label('Lugar (si presencial)')
                        ->maxLength(255)
                        ->nullable()
                        ->visible(fn (Forms\Get $get) => ! $get('is_online')),

                    Forms\Components\TextInput::make('online_url')
                        ->label('Enlace online')
                        ->url()
                        ->maxLength(255)
                        ->nullable()
                        ->visible(fn (Forms\Get $get) => (bool) $get('is_online')),

                    Forms\Components\TextInput::make('registration_url')
                        ->label('Enlace de inscripción')
                        ->url()
                        ->maxLength(255)
                        ->nullable(),

                    Forms\Components\Textarea::make('description')
                        ->label('Descripción breve')
                        ->rows(4)
                        ->columnSpanFull()
                        ->nullable(),

                    Forms\Components\RichEditor::make('content')
                        ->label('Contenido')
                        ->columnSpanFull()
                        ->disableToolbarButtons(['attachFiles'])
                        ->nullable(),

                    Forms\Components\FileUpload::make('image_url')
                        ->disk('cloudinary')
                        ->directory('events')
                        ->image()
                        ->label('Imagen')
                        ->afterStateUpdated(function ($state, $old, $record) {
                            if ($record?->image_url && $old && $old !== $state) {
                                Storage::disk('cloudinary')->delete($old);
                            }
                        }),

                    Forms\Components\TextInput::make('image_alt')
                        ->label('Texto alternativo (ALT)')
                        ->maxLength(255)
                        ->nullable(),
                ])
                ->columns(2),

            Forms\Components\Section::make('Publicación')
                ->schema([
                    Forms\Components\Toggle::make('is_published')
                        ->label('Publicado')
                        ->default(false)
                        ->live(),

                    Forms\Components\DateTimePicker::make('published_at')
                        ->label('Fecha/hora de publicación')
                        ->seconds(false)
                        ->nullable()
                        ->helperText('Opcional. Si está vacío y publicas, puedes dejarlo sin fecha o rellenarlo manualmente.'),
                ])
                ->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('start_at', 'desc')
            ->columns([
                Tables\Columns\IconColumn::make('is_published')->boolean()->label('Publicado')->sortable(),

                Tables\Columns\TextColumn::make('title')->searchable()->sortable(),

                Tables\Columns\TextColumn::make('category.name')
                    ->label('Categoría')
                    ->sortable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('start_at')
                    ->label('Inicio')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),

                Tables\Columns\TextColumn::make('end_at')
                    ->label('Fin')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\IconColumn::make('is_online')->boolean()->label('Online')->sortable(),

                Tables\Columns\TextColumn::make('location')
                    ->label('Lugar')
                    ->searchable()
                    ->toggleable(),

                Tables\Columns\ImageColumn::make('image_url')->disk('cloudinary')->label('Imagen'),

                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Actualizado')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
                Tables\Filters\SelectFilter::make('event_category_id')
                    ->label('Categoría')
                    ->relationship('category', 'name'),
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
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }

    public static function uniqueSlug(string $baseSlug, string $modelClass, ?int $ignoreId = null): string
    {
        $slug = Str::slug($baseSlug);

        // Si no existe, lo devolvemos tal cual
        $exists = $modelClass::query()
            ->when($ignoreId, fn ($q) => $q->whereKeyNot($ignoreId))
            ->where('slug', $slug)
            ->exists();

        if (! $exists) {
            return $slug;
        }

        // Si existe, buscamos el mayor sufijo usado: slug-2, slug-3...
        $like = $slug . '-%';

        $maxSuffix = $modelClass::query()
            ->when($ignoreId, fn ($q) => $q->whereKeyNot($ignoreId))
            ->where(function ($q) use ($slug, $like) {
                $q->where('slug', $slug)->orWhere('slug', 'like', $like);
            })
            ->pluck('slug')
            ->map(function ($s) use ($slug) {
                if ($s === $slug) return 1;
                if (preg_match('/^' . preg_quote($slug, '/') . '-(\d+)$/', $s, $m)) {
                    return (int) $m[1];
                }
                return 0;
            })
            ->max();

        $next = max(2, (int) $maxSuffix + 1);

        return "{$slug}-{$next}";
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
