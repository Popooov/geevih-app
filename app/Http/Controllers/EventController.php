<?php

namespace App\Http\Controllers;

use App\Enums\ScheduleType;
use App\Models\Event;
use App\Models\EventCategory;
use App\Support\CloudinaryImageUrl;
use App\Support\SharePreview;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Format a date manually in Spanish.
     */
    private function formatSpanishDate(mixed $date, bool $abbreviated = false, bool $includeYear = true): string
    {
        if (! $date) {
            return '';
        }

        try {
            $c = $date instanceof \DateTimeInterface
                ? Carbon::instance($date)
                : Carbon::parse($date);

            $meses = [
                'enero',
                'febrero',
                'marzo',
                'abril',
                'mayo',
                'junio',
                'julio',
                'agosto',
                'septiembre',
                'octubre',
                'noviembre',
                'diciembre',
            ];
            $mesesAbreviados = [
                'ene.',
                'feb.',
                'mar.',
                'abr.',
                'may.',
                'jun.',
                'jul.',
                'ago.',
                'sept.',
                'oct.',
                'nov.',
                'dic.',
            ];

            $dia = $c->format('j');
            $mesIndice = (int) $c->format('n') - 1;
            $mesNombre = $abbreviated ? $mesesAbreviados[$mesIndice] : $meses[$mesIndice];
            $anio = $c->format('Y');
            $fecha = $abbreviated ? "{$dia} {$mesNombre}" : "{$dia} de {$mesNombre}";

            return $includeYear ? "{$fecha} de {$anio}" : $fecha;
        } catch (\Throwable $e) {
            return '';
        }
    }

    /**
     * Format an event date range in Spanish.
     */
    private function formatSpanishDateRange(mixed $start, mixed $end = null): string
    {
        if (! $start) {
            return '';
        }

        try {
            $startDate = $start instanceof \DateTimeInterface
                ? Carbon::instance($start)
                : Carbon::parse($start);

            if (! $end) {
                return $this->formatSpanishDate($startDate);
            }

            $endDate = $end instanceof \DateTimeInterface
                ? Carbon::instance($end)
                : Carbon::parse($end);

            if ($startDate->isSameDay($endDate)) {
                return $this->formatSpanishDate($startDate);
            }

            if ($startDate->format('Y-m') === $endDate->format('Y-m')) {
                return $startDate->format('j').'–'.$this->formatSpanishDate($endDate);
            }

            $differentYear = $startDate->year !== $endDate->year;

            return $this->formatSpanishDate($startDate, abbreviated: true, includeYear: $differentYear)
                .' – '.$this->formatSpanishDate($endDate, abbreviated: true);
        } catch (\Throwable $e) {
            return '';
        }
    }

    private function formatEventSchedule(Event $event): array
    {
        $start = $event->start_at;
        $end = $event->end_at;
        $isMultiDay = $start && $end && ! $start->isSameDay($end);
        $differentYear = $isMultiDay && $start->year !== $end->year;
        $isCourse = $event->category?->slug === 'cursos';
        $notes = trim($event->schedule_notes ?? '');

        if ($event->scheduleType() !== ScheduleType::Fixed) {
            $flexible = $event->scheduleType() === ScheduleType::Availability;
            $timeFacts = $flexible
                ? [['tipo' => 'flexible', 'etiqueta' => 'Organización', 'valor' => 'A tu ritmo']]
                : [[
                    'tipo' => 'sesiones',
                    'etiqueta' => 'Horario de las sesiones',
                    'valor' => $notes ?: ($event->program_url ? 'Consulta el programa' : 'Por confirmar'),
                ]];

            if (! $end) {
                $timeFacts[] = ['tipo' => 'fin', 'etiqueta' => 'Fin del periodo', 'valor' => 'Sin fecha publicada'];
            }

            if ($flexible && $notes !== '') {
                $timeFacts[] = ['tipo' => 'nota', 'etiqueta' => 'Información del acceso', 'valor' => $notes];
            }

            $dateLabel = $flexible ? 'Periodo de acceso' : ($isCourse ? 'Periodo del curso' : 'Fechas');

            if (! $end) {
                $dateLabel = $flexible ? 'Disponible desde' : ($isCourse ? 'Inicio del curso' : 'Inicio del evento');
            }

            return [
                'fecha' => $this->formatSpanishDateRange($start, $end),
                'fecha_label' => $dateLabel,
                'horarios' => $timeFacts,
                'hora_resumen' => $flexible ? 'A tu ritmo' : 'Por sesiones',
                'hora' => null,
                'fin' => null,
            ];
        }

        $startTime = $event->hasStartTime() ? $start?->format('H:i') : null;
        $endTime = $event->hasEndTime() ? $end?->format('H:i') : null;
        $timeRange = ! $isMultiDay && $startTime !== null && $endTime !== null
            ? $startTime.' – '.$endTime
            : null;

        $startValue = $isMultiDay && $startTime !== null
            ? $this->formatSpanishDate($start, abbreviated: true, includeYear: $differentYear).' a las '.$startTime
            : $startTime;
        $endValue = $isMultiDay && $endTime !== null
            ? $this->formatSpanishDate($end, abbreviated: true, includeYear: $differentYear).' a las '.$endTime
            : $endTime;

        $timeFacts = [];

        if ($timeRange !== null) {
            $timeFacts[] = ['tipo' => 'horario', 'etiqueta' => 'Horario', 'valor' => $timeRange];
        } else {
            if ($startValue !== null) {
                $startLabel = $isMultiDay
                    ? ($isCourse ? 'Inicio del curso' : 'Inicio del evento')
                    : 'Hora de inicio';
                $timeFacts[] = ['tipo' => 'inicio', 'etiqueta' => $startLabel, 'valor' => $startValue];
            }

            if ($endValue !== null) {
                $endLabel = $isMultiDay
                    ? ($isCourse ? 'Fin del curso' : 'Fin del evento')
                    : 'Hora de fin';
                $timeFacts[] = ['tipo' => 'fin', 'etiqueta' => $endLabel, 'valor' => $endValue];
            }
        }

        $cardTime = $timeRange;

        if ($cardTime === null && $startValue !== null) {
            $cardTime = $isMultiDay ? 'Inicio el '.$startValue : 'Inicio a las '.$startValue;
        }

        if ($cardTime === null && $endValue !== null) {
            $cardTime = $isMultiDay ? 'Fin el '.$endValue : 'Fin a las '.$endValue;
        }

        if ($notes !== '') {
            $timeFacts[] = ['tipo' => 'nota', 'etiqueta' => 'Información del horario', 'valor' => $notes];
        }

        return [
            'fecha' => $this->formatSpanishDateRange($start, $end),
            'fecha_label' => $isMultiDay ? ($isCourse ? 'Periodo del curso' : 'Fechas') : 'Fecha',
            'horarios' => $timeFacts,
            'hora_resumen' => $cardTime,
            'hora' => $timeRange ?? $startTime,
            'fin' => $timeRange === null ? $endTime : null,
        ];
    }

    private function resolveImageUrl(?string $path): ?string
    {
        $path = trim($path ?? '');

        if ($path === '') {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        $cloud = env('CLOUDINARY_CLOUD_NAME') ?: null;

        if (! $cloud) {
            $cloudinaryUrl = env('CLOUDINARY_URL', env('CLOUDINARY_API_URL', ''));

            if ($cloudinaryUrl && str_contains($cloudinaryUrl, '@')) {
                $parts = explode('@', $cloudinaryUrl, 2);
                $cloud = $parts[1] ?? null;
            } else {
                $parsed = parse_url($cloudinaryUrl);
                $host = $parsed['host'] ?? null;

                if ($host && str_contains($host, 'res.cloudinary.com')) {
                    $segments = explode('/', trim($parsed['path'] ?? '', '/'));
                    $cloud = $segments[0] ?? null;
                }
            }
        }

        if ($cloud) {
            return sprintf(
                'https://res.cloudinary.com/%s/image/upload/%s',
                $cloud,
                ltrim($path, '/')
            );
        }

        return Storage::disk('cloudinary')->url($path);
    }

    public function index(?EventCategory $category = null)
    {
        // Store the current date and time to compare events against it.
        $now = now();

        // Build the base query for published events.
        // The category relationship is eager loaded to avoid extra queries.
        // If a category is provided, only events from that category are returned.
        $base = Event::query()
            ->with('category')
            ->where('is_published', true)
            ->when($category, fn ($q) => $q->where('event_category_id', $category->id));

        // Both lists use the same calendar rules as the detail view.
        // All published events were already loaded for this unpaginated listing.
        [$upcoming, $past] = $base
            ->orderBy('start_at', 'asc')
            ->get()
            ->partition(fn (Event $event) => ! $event->isPastAt($now));

        // Transform each Event model into the structure expected by the React page.
        $mapEvent = function (Event $event) use ($now) {
            $start = $event->start_at;

            $schedule = $this->formatEventSchedule($event);

            // Get the category slug if the event has a category.
            $categorySlug = $event->category?->slug;

            return [
                'id' => $event->id,
                'titulo' => $event->title,
                'slug' => $event->slug,

                'lugar' => $event->attendanceMode()->allowsInPerson() ? $event->location : null,

                'fecha' => $schedule['fecha'],
                'year' => $start?->year,
                'hora' => $schedule['hora_resumen'],
                'descripcion' => $event->description,

                // Convert the Cloudinary stored path into a public URL.
                'imagen' => CloudinaryImageUrl::transform(
                    $this->resolveImageUrl($event->image_url),
                    'f_auto,q_auto:eco,c_fill,g_auto,w_768,h_432'
                ),

                // Generate the event detail URL.
                // New category-based routes are used when the event has a category.
                // Otherwise, the legacy route is used as a fallback.
                'link' => $categorySlug
                    ? route('training.show', [
                        'category' => $categorySlug,
                        'event' => $event->slug,
                    ])
                    : route('events.legacy-show', $event),

                'registration_url' => $event->registration_url,
                'online_url' => $event->attendanceMode()->allowsOnline() ? $event->online_url : null,
                'attendance_mode' => $event->attendanceMode()->value,
                'is_online' => $event->attendanceMode()->allowsOnline(),
                'schedule_type' => $event->scheduleType()->value,

                'isPast' => $event->isPastAt($now),
                'isOngoing' => $event->isOngoingAt($now),
                'status_label' => $event->statusLabelAt($now),

                'category' => $event->category?->name,
                'category_slug' => $categorySlug,
            ];
        };

        // Render the events index page with upcoming events, past events,
        // and the current category if one was selected.
        return Inertia::render('events/index', [
            'upcomingEvents' => $upcoming->map($mapEvent)->values(),
            'pastEvents' => $past->sortByDesc('start_at')->map($mapEvent)->values(),
            'currentCategory' => $category ? [
                'name' => $category->name,
                'slug' => $category->slug,
            ] : null,
        ]);
    }

    public function show(EventCategory $category, Event $event)
    {
        // Return a 404 if the event is not published.
        abort_unless($event->is_published, 404);

        // Return a 404 if the event does not belong to the category from the URL.
        abort_unless($event->event_category_id === $category->id, 404);

        // Store the current date and time to check the event status.
        $now = now();

        $schedule = $this->formatEventSchedule($event);
        $attendanceMode = $event->attendanceMode();
        $imageUrl = $this->resolveImageUrl($event->image_url);
        $link = route('training.show', [
            'category' => $category->slug,
            'event' => $event->slug,
        ]);

        // Render the event detail page with all data needed by React.
        return Inertia::render('events/show', [
            'event' => [
                'id' => $event->id,
                'titulo' => $event->title,
                'slug' => $event->slug,

                'lugar' => $attendanceMode->allowsInPerson() ? $event->location : null,

                'fecha' => $schedule['fecha'],
                'fecha_label' => $schedule['fecha_label'],
                'horarios' => $schedule['horarios'],
                'hora' => $schedule['hora'],
                'fin' => $schedule['fin'],
                'descripcion' => $event->description,
                'contenido' => $event->content,

                // Convert the Cloudinary stored path into a public URL.
                'imagen' => CloudinaryImageUrl::transform(
                    $imageUrl,
                    'f_auto,q_auto:eco,c_limit,w_1040,h_585'
                ),

                'registration_url' => $event->registration_url,
                'online_url' => $attendanceMode->allowsOnline() ? $event->online_url : null,
                'program_url' => $event->program_url,
                'attendance_mode' => $attendanceMode->value,
                'is_online' => $attendanceMode->allowsOnline(),
                'schedule_type' => $event->scheduleType()->value,
                'isOngoing' => $event->isOngoingAt($now),
                'isPast' => $event->isPastAt($now),
                'status_label' => $event->statusLabelAt($now),

                'category' => $event->category?->name,
                'category_slug' => $event->category?->slug,

                // Link back to the selected training category.
                'backLink' => route('training.category', $category->slug),

                // Current event detail URL.
                'link' => $link,
            ],
        ])->withViewData('sharePreview', SharePreview::make(
            type: 'website',
            title: $event->title,
            url: $link,
            description: implode(' · ', array_filter([
                $schedule['fecha'],
                $attendanceMode->getLabel(),
                trim($event->description ?? ''),
            ])),
            imageUrl: $imageUrl,
            imageAlt: $event->image_alt,
            fallbackImage: 'images/event-share.jpg',
        ));
    }
}
