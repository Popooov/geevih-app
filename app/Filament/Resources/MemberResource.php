<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MemberResource\Pages;
use App\Filament\Resources\MemberResource\RelationManagers;
use App\Models\Member;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class MemberResource extends Resource
{
    protected static ?string $model = Member::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationGroup = 'Contenido';
    protected static ?string $modelLabel = 'Miembro';
    protected static ?string $pluralModelLabel = 'Miembros';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Datos del miembro')
                ->schema([
                    Forms\Components\TextInput::make('name')
                        ->label('Nombre')
                        ->required()
                        ->maxLength(255),

                    Forms\Components\TextInput::make('affiliation')
                        ->label('Filiación')
                        ->required()
                        ->maxLength(255),

                    Forms\Components\Textarea::make('summary')
                        ->label('Resumen')
                        ->required()
                        ->rows(6)
                        ->maxLength(2000),

                    Forms\Components\TextInput::make('email')
                        ->label('Email')
                        ->email()
                        ->maxLength(255),

                    Forms\Components\FileUpload::make('photo_url')
                        ->label('Foto')
                        ->image()
                        ->disk('cloudinary')
                        ->directory('members')
                        ->visibility('public')
                        ->maxSize(4096) // 4MB
                        ->helperText('Sube una foto. Se guardará en Cloudinary dentro de /members.'),

                    Forms\Components\TextInput::make('sort_order')
                        ->label('Orden')
                        ->numeric()
                        ->default(0),

                    Forms\Components\Toggle::make('is_published')
                        ->label('Publicado')
                        ->default(true),
                ])
                ->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->columns([
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Orden')
                    ->sortable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('name')
                    ->label('Nombre')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('affiliation')
                    ->label('Filiación')
                    ->searchable()
                    ->sortable()
                    ->limit(35),

                Tables\Columns\ImageColumn::make('photo_url')
                    ->label('Foto')
                    ->square()
                    ->toggleable(),

                Tables\Columns\IconColumn::make('is_published')
                    ->label('Publicado')
                    ->boolean()
                    ->sortable(),

                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Actualizado')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMembers::route('/'),
            'create' => Pages\CreateMember::route('/create'),
            'edit' => Pages\EditMember::route('/{record}/edit'),
        ];
    }
}
