<?php

namespace App\Filament\Resources;

use App\Enums\AttendanceMode;
use App\Enums\ScheduleType;
use App\Filament\Resources\EventResource\Pages;
use App\Models\Event;
use Carbon\Carbon;
use Closure;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

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

                    Forms\Components\Select::make('attendance_mode')
                        ->label('Modalidad de participación')
                        ->options(AttendanceMode::class)
                        ->default(AttendanceMode::InPerson->value)
                        ->required()
                        ->rule(Rule::enum(AttendanceMode::class))
                        ->live()
                        ->helperText('Híbrido permite participar presencialmente o por internet.'),

                    Forms\Components\TextInput::make('location')
                        ->label('Sede presencial')
                        ->maxLength(255)
                        ->nullable()
                        ->visible(fn (Forms\Get $get) => $get('attendance_mode') !== AttendanceMode::Online->value)
                        ->dehydratedWhenHidden(),

                    Forms\Components\TextInput::make('online_url')
                        ->label('Enlace de acceso online')
                        ->url()
                        ->rule('url:http,https')
                        ->maxLength(255)
                        ->nullable()
                        ->visible(fn (Forms\Get $get) => $get('attendance_mode') !== AttendanceMode::InPerson->value)
                        ->dehydratedWhenHidden()
                        ->helperText('Opcional. Puedes añadirlo cuando el acceso esté disponible.'),

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

            Forms\Components\Section::make('Calendario')
                ->description('La organización temporal es independiente de la modalidad de participación.')
                ->schema([
                    Forms\Components\Select::make('schedule_type')
                        ->label('Organización temporal')
                        ->options(ScheduleType::class)
                        ->default(ScheduleType::Fixed->value)
                        ->required()
                        ->rule(Rule::enum(ScheduleType::class))
                        ->live()
                        ->afterStateUpdated(function (Forms\Get $get, Forms\Set $set): void {
                            if ($get('schedule_type') === ScheduleType::Fixed->value) {
                                return;
                            }

                            foreach (['start', 'end'] as $endpoint) {
                                $set("has_{$endpoint}_time", false);

                                if ($value = $get("{$endpoint}_at")) {
                                    $set("{$endpoint}_at", Carbon::parse($value)->startOfDay()->toDateTimeString());
                                }
                            }
                        })
                        ->helperText('Horario definido: inicio y cierre del evento. Por sesiones: días concretos según horario o programa. Acceso flexible: cada participante avanza a su ritmo.')
                        ->columnSpanFull(),

                    Forms\Components\Group::make()->schema([
                        self::timeToggle('start'),
                        self::calendarField('start')->required(),
                    ]),

                    Forms\Components\Group::make()->schema([
                        self::timeToggle('end'),
                        self::calendarField('end')
                            ->nullable()
                            ->helperText('Opcional. Si no hay fecha de cierre publicada, déjalo vacío.')
                            ->rule(fn (Forms\Get $get): Closure => function (string $attribute, mixed $value, Closure $fail) use ($get): void {
                                if (! $value || ! $get('start_at')) {
                                    return;
                                }

                                $event = new Event([
                                    'start_at' => $get('start_at'),
                                    'end_at' => $value,
                                    'schedule_type' => $get('schedule_type'),
                                    'has_start_time' => $get('has_start_time'),
                                    'has_end_time' => $get('has_end_time'),
                                ]);

                                if ($event->effectiveEndAt()->lt($event->effectiveStartAt())) {
                                    $fail('El fin debe ser igual o posterior al inicio.');
                                }
                            }),
                    ]),

                    Forms\Components\Textarea::make('schedule_notes')
                        ->label(fn (Forms\Get $get): string => match ($get('schedule_type')) {
                            ScheduleType::Sessions->value => 'Horario de las sesiones',
                            ScheduleType::Availability->value => 'Información del acceso',
                            default => 'Información adicional del horario',
                        })
                        ->helperText('Ej.: martes y jueves, de 16:00 a 18:00. Si presencial y online tienen horarios diferentes, indícalos aquí o en el programa.')
                        ->rows(3)
                        ->maxLength(2000)
                        ->nullable()
                        ->columnSpanFull(),

                    Forms\Components\TextInput::make('program_url')
                        ->label('Enlace al programa')
                        ->url()
                        ->rule('url:http,https')
                        ->maxLength(255)
                        ->nullable()
                        ->helperText('Opcional. Enlace a la página o PDF con la programación publicada.')
                        ->columnSpanFull(),
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
                    ->dateTime(fn (Event $record): string => $record->hasStartTime() ? 'd/m/Y H:i' : 'd/m/Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('end_at')
                    ->label('Fin')
                    ->dateTime(fn (Event $record): string => $record->hasEndTime() ? 'd/m/Y H:i' : 'd/m/Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('attendance_mode')
                    ->label('Modalidad')
                    ->badge()
                    ->sortable(),

                Tables\Columns\TextColumn::make('schedule_type')
                    ->label('Organización temporal')
                    ->toggleable(),

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
                Tables\Filters\SelectFilter::make('attendance_mode')
                    ->label('Modalidad')
                    ->options(AttendanceMode::class),
                Tables\Filters\SelectFilter::make('schedule_type')
                    ->label('Organización temporal')
                    ->options(ScheduleType::class),
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

    private static function timeToggle(string $endpoint): Forms\Components\Toggle
    {
        return Forms\Components\Toggle::make("has_{$endpoint}_time")
            ->label($endpoint === 'start' ? 'Indicar hora de inicio' : 'Indicar hora de fin')
            ->default(false)
            ->live()
            ->visible(fn (Forms\Get $get) => $get('schedule_type') === ScheduleType::Fixed->value)
            ->dehydratedWhenHidden()
            ->afterStateUpdated(function (mixed $state, Forms\Get $get, Forms\Set $set) use ($endpoint): void {
                if (! $state && ($value = $get("{$endpoint}_at"))) {
                    $set("{$endpoint}_at", Carbon::parse($value)->startOfDay()->toDateTimeString());
                }
            });
    }

    private static function calendarField(string $endpoint): Forms\Components\DateTimePicker
    {
        $hasTime = fn (Forms\Get $get): bool => $get('schedule_type') === ScheduleType::Fixed->value
            && (bool) $get("has_{$endpoint}_time");

        return Forms\Components\DateTimePicker::make("{$endpoint}_at")
            ->label(fn (Forms\Get $get): string => match ($get('schedule_type')) {
                ScheduleType::Availability->value => $endpoint === 'start' ? 'Disponible desde' : 'Disponible hasta',
                ScheduleType::Sessions->value => $endpoint === 'start' ? 'Primera fecha' : 'Última fecha',
                default => $endpoint === 'start' ? 'Inicio del evento' : 'Fin del evento',
            })
            ->native(false)
            ->locale('es')
            ->seconds(false)
            ->time($hasTime)
            ->displayFormat(fn (Forms\Get $get): string => $hasTime($get) ? 'd/m/Y H:i' : 'd/m/Y')
            ->dehydrateStateUsing(function (?string $state, Forms\Get $get) use ($hasTime): ?string {
                if (! $state) {
                    return null;
                }

                $date = Carbon::parse($state);

                return ($hasTime($get) ? $date : $date->startOfDay())->toDateTimeString();
            });
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
        $like = $slug.'-%';

        $maxSuffix = $modelClass::query()
            ->when($ignoreId, fn ($q) => $q->whereKeyNot($ignoreId))
            ->where(function ($q) use ($slug, $like) {
                $q->where('slug', $slug)->orWhere('slug', 'like', $like);
            })
            ->pluck('slug')
            ->map(function ($s) use ($slug) {
                if ($s === $slug) {
                    return 1;
                }
                if (preg_match('/^'.preg_quote($slug, '/').'-(\d+)$/', $s, $m)) {
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
