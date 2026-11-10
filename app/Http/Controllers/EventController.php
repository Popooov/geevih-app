<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventCategory;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Carbon\Carbon;

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
                return $startDate->format('j') . '–' . $this->formatSpanishDate($endDate);
            }

            $differentYear = $startDate->year !== $endDate->year;

            return $this->formatSpanishDate($startDate, abbreviated: true, includeYear: $differentYear)
                . ' – ' . $this->formatSpanishDate($endDate, abbreviated: true);
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

        // Existing records use midnight to represent a date without a published time.
        $startTime = $start && $start->format('H:i') !== '00:00' ? $start->format('H:i') : null;
        $endTime = $end && $end->format('H:i') !== '00:00' ? $end->format('H:i') : null;
        $timeRange = ! $isMultiDay && $startTime !== null && $endTime !== null
            ? $startTime . ' – ' . $endTime
            : null;

        $startValue = $isMultiDay && $startTime !== null
            ? $this->formatSpanishDate($start, abbreviated: true, includeYear: $differentYear) . ' a las ' . $startTime
            : $startTime;
        $endValue = $isMultiDay && $endTime !== null
            ? $this->formatSpanishDate($end, abbreviated: true, includeYear: $differentYear) . ' a las ' . $endTime
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
            $cardTime = $isMultiDay ? 'Inicio el ' . $startValue : 'Inicio a las ' . $startValue;
        }

        if ($cardTime === null && $endValue !== null) {
            $cardTime = $isMultiDay ? 'Fin el ' . $endValue : 'Fin a las ' . $endValue;
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

    private function resolveOptimizedCloudinaryImageUrl(?string $path, string $transformations): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            if (str_contains($path, 'res.cloudinary.com') && str_contains($path, '/image/upload/')) {
                return preg_replace(
                    '#/image/upload/#',
                    "/image/upload/{$transformations}/",
                    $path,
                    1
                );
            }

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
                'https://res.cloudinary.com/%s/image/upload/%s/%s',
                $cloud,
                $transformations,
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

        // Get upcoming or ongoing events.
        // If the event has an end date, it is considered upcoming/active while end_at is in the future.
        // If the event has no end date, start_at is used instead.
        $upcoming = (clone $base)
            ->where(function ($q) use ($now) {
                $q->whereNotNull('end_at')->where('end_at', '>=', $now)
                    ->orWhere(function ($q2) use ($now) {
                        $q2->whereNull('end_at')->where('start_at', '>=', $now);
                    });
            })
            ->orderBy('start_at', 'asc')
            ->get();

        // Get past events.
        // If the event has an end date, it is past when end_at is before now.
        // If the event has no end date, start_at is used instead.
        $past = (clone $base)
            ->where(function ($q) use ($now) {
                $q->whereNotNull('end_at')->where('end_at', '<', $now)
                    ->orWhere(function ($q2) use ($now) {
                        $q2->whereNull('end_at')->where('start_at', '<', $now);
                    });
            })
            ->orderBy('start_at', 'desc')
            ->get();

        // Transform each Event model into the structure expected by the React page.
        $mapEvent = function (Event $event) use ($now) {
            $start = $event->start_at;
            $end = $event->end_at;

            // Determine if the event is already finished.
            // If end_at exists, it is used. Otherwise, start_at is used.
            $isPast = ($end ?? $start)?->lt($now) ?? false;

            // Determine if the event is currently active.
            // This only applies when the event has an end date.
            $isOngoing = $end ? ($start->lte($now) && $end->gte($now)) : false;

            $schedule = $this->formatEventSchedule($event);

            // Get the category slug if the event has a category.
            $categorySlug = $event->category?->slug;

            return [
                'id' => $event->id,
                'titulo' => $event->title,
                'slug' => $event->slug,

                // Show "Online" as the place when the event is online.
                'lugar' => $event->is_online ? 'Online' : $event->location,

                'fecha' => $schedule['fecha'],
                'year' => $start?->year,
                'hora' => $schedule['hora_resumen'],
                'descripcion' => $event->description,

                // Convert the Cloudinary stored path into a public URL.
                'imagen' => $this->resolveOptimizedCloudinaryImageUrl(
                    $event->image_url,
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
                'online_url' => $event->online_url,
                'is_online' => $event->is_online,

                'isPast' => $isPast,
                'isOngoing' => $isOngoing,

                'category' => $event->category?->name,
                'category_slug' => $categorySlug,
            ];
        };

        // Render the events index page with upcoming events, past events,
        // and the current category if one was selected.
        return Inertia::render('events/index', [
            'upcomingEvents' => $upcoming->map($mapEvent)->values(),
            'pastEvents' => $past->map($mapEvent)->values(),
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

        $start = $event->start_at;
        $end = $event->end_at;

        // Check if the event is currently ongoing.
        // This only applies to events with an end date.
        $isOngoing = $end ? ($start->lte($now) && $end->gte($now)) : false;
        $isPast = ($end ?? $start)?->lt($now) ?? false;

        $schedule = $this->formatEventSchedule($event);

        // Render the event detail page with all data needed by React.
        return Inertia::render('events/show', [
            'event' => [
                'id' => $event->id,
                'titulo' => $event->title,
                'slug' => $event->slug,

                // Show "Online" as the place when the event is online.
                'lugar' => $event->is_online ? 'Online' : $event->location,

                'fecha' => $schedule['fecha'],
                'fecha_label' => $schedule['fecha_label'],
                'horarios' => $schedule['horarios'],
                'hora' => $schedule['hora'],
                'fin' => $schedule['fin'],
                'descripcion' => $event->description,
                'contenido' => $event->content,

                // Convert the Cloudinary stored path into a public URL.
                'imagen' => $this->resolveOptimizedCloudinaryImageUrl(
                    $event->image_url,
                    'f_auto,q_auto:eco,c_limit,w_1040,h_585'
                ),

                'registration_url' => $event->registration_url,
                'online_url' => $event->online_url,
                'is_online' => $event->is_online,
                'isOngoing' => $isOngoing,
                'isPast' => $isPast,

                'category' => $event->category?->name,
                'category_slug' => $event->category?->slug,

                // Link back to the selected training category.
                'backLink' => route('training.category', $category->slug),

                // Current event detail URL.
                'link' => route('training.show', [
                    'category' => $category->slug,
                    'event' => $event->slug,
                ]),
            ],
        ]);
    }
}
