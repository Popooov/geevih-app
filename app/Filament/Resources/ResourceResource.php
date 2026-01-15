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
use Filament\Tables\Columns\ImageColumn;

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
                    ->required(),

                // Subida del fichero principal (ej. PDF)
                FileUpload::make('file_url')
                    ->label('Archivo (PDF / Documentos)')
                    ->disk('cloudinary')
                    ->directory('resources')
                    ->acceptedFileTypes(['application/pdf'])
                    ->preserveFilenames(false)
                    ->openable()
                    ->downloadable()
                    ->nullable(),

                // Subida de imagen miniatura asociada al recurso
                FileUpload::make('image_url')
                    ->label('Imagen (miniatura)')
                    ->image()
                    ->disk('cloudinary')
                    ->directory('resources/images')
                    ->acceptedFileTypes(['image/*'])
                    ->preserveFilenames(false)
                    ->openable()
                    ->downloadable()
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

                // Miniatura: resuelve vía disco cloudinary
                ImageColumn::make('image_url')
                    ->label('Imagen')
                    ->disk('cloudinary')
                    ->toggleable(),

                // Enlace al archivo (solo si file_url contiene URL absoluta)
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
