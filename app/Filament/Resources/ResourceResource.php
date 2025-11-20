<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ResourceResource\Pages;
use App\Models\Resource as ContentResource;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
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
                    ])
                    ->required(),

                FileUpload::make('file_url')
                    ->label('Archivo (Cloudinary)')
                    ->disk('cloudinary')
                    ->directory('resources')
                    ->acceptedFileTypes(['application/pdf']) // o quita si aceptas otros tipos
                    ->maxSize(10240) // 10 MB en KB
                    ->preserveFilenames(false)
                    ->openable()     // muestra botón para abrir en nueva pestaña en el panel
                    ->downloadable() // permite descargar desde el panel
                    ->nullable(),

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

                TextColumn::make('file_url')
                    ->label('Archivo')
                    ->wrap(false)
                    ->url(fn ($record) => is_string($record->file_url) && str_starts_with($record->file_url, 'http') ? $record->file_url : null)
                    ->openUrlInNewTab(),

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
