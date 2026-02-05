<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewsResource\Pages;
use App\Models\News;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class NewsResource extends Resource
{
    protected static ?string $model = News::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';
    protected static ?string $navigationGroup = 'Contenido';
    protected static ?string $modelLabel = 'Noticia';
    protected static ?string $pluralModelLabel = 'Noticias';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Noticia')
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

                    Forms\Components\TextInput::make('slug')
                        ->label('Slug')
                        ->required()
                        ->maxLength(255)
                        ->helperText('Se ajustará automáticamente si ya existe.'),

                    Forms\Components\Textarea::make('summary')
                        ->label('Resumen')
                        ->rows(4)
                        ->columnSpanFull()
                        ->nullable(),

                    Forms\Components\RichEditor::make('content')
                        ->label('Texto completo')
                        ->columnSpanFull()
                        ->disableToolbarButtons(['attachFiles'])
                        ->nullable(),

                    Forms\Components\FileUpload::make('image_url')
                        ->disk('cloudinary')
                        ->directory('news')
                        ->image()
                        ->label('Imagen'),

                    Forms\Components\TextInput::make('image_alt')
                        ->label('ALT imagen')
                        ->maxLength(255)
                        ->nullable(),

                    Forms\Components\TextInput::make('source_url')
                        ->label('Fuente (URL)')
                        ->url()
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

                    Forms\Components\Toggle::make('is_featured')
                        ->label('Destacada')
                        ->default(false),

                    Forms\Components\DateTimePicker::make('published_at')
                        ->label('Fecha/hora de publicación')
                        ->seconds(false)
                        ->nullable(),
                ])
                ->columns(3),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('published_at', 'desc')
            ->columns([
                Tables\Columns\IconColumn::make('is_published')->boolean()->label('Publicado')->sortable(),
                Tables\Columns\IconColumn::make('is_featured')->boolean()->label('Destacada')->sortable()->toggleable(),

                Tables\Columns\TextColumn::make('title')->searchable()->sortable(),

                Tables\Columns\TextColumn::make('published_at')
                    ->label('Publicación')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),

                Tables\Columns\TextColumn::make('summary')->label('Resumen')->limit(60)->toggleable(),

                Tables\Columns\ImageColumn::make('image_url')->disk('cloudinary')->label('Imagen'),

                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Actualizado')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
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
            'index' => Pages\ListNews::route('/'),
            'create' => Pages\CreateNews::route('/create'),
            'edit' => Pages\EditNews::route('/{record}/edit'),
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
