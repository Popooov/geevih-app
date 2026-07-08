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
    private function formatSpanishDate(mixed $date): string
    {
        if (! $date) {
            return '';
        }

        try {
            $c = $date instanceof \DateTime
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

            $dia = $c->format('j');
            $mesNombre = $meses[(int) $c->format('n') - 1];
            $anio = $c->format('Y');

            return "{$dia} de {$mesNombre} de {$anio}";
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
            $startDate = $start instanceof \DateTime
                ? Carbon::instance($start)
                : Carbon::parse($start);

            if (! $end) {
                return $this->formatSpanishDate($startDate);
            }

            $endDate = $end instanceof \DateTime
                ? Carbon::instance($end)
                : Carbon::parse($end);

            if ($startDate->isSameDay($endDate)) {
                return $this->formatSpanishDate($startDate);
            }

            return $this->formatSpanishDate($startDate) . ' – ' . $this->formatSpanishDate($endDate);
        } catch (\Throwable $e) {
            return '';
        }
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

            // Format start and end times.
            // 00:00 is treated as "no visible time" because some events only need a date.
            $hasStartTime = $start && $start->format('H:i') !== '00:00';
            $hasEndTime = $end && $end->format('H:i') !== '00:00';

            $time = $hasStartTime ? $start->format('H:i') : null;
            $endTime = $hasEndTime ? $end->format('H:i') : null;

            // Build the visible date range.
            // If the event starts and ends on the same day, only one date is shown.
            // If it spans multiple days, a date range is shown.
            $dateRange = $this->formatSpanishDateRange($start, $end);

            // Build the visible time range.
            // If the event starts and ends on the same day, both times are shown.
            // If it spans multiple days, only the start time is shown.
            $timeRange = null;

            if ($time) {
                $timeRange = $time;

                if ($end && $start->isSameDay($end) && $endTime) {
                    $timeRange = $time . ' – ' . $endTime;
                }
            }

            // Get the category slug if the event has a category.
            $categorySlug = $event->category?->slug;

            return [
                'id' => $event->id,
                'titulo' => $event->title,
                'slug' => $event->slug,

                // Show "Online" as the place when the event is online.
                'lugar' => $event->is_online ? 'Online' : $event->location,

                'fecha' => $dateRange,
                'hora' => $timeRange,
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

        // Format start and end times.
        // 00:00 is treated as "no visible time" because some events only need a date.
        $hasStartTime = $start && $start->format('H:i') !== '00:00';
        $hasEndTime = $end && $end->format('H:i') !== '00:00';

        $time = $hasStartTime ? $start->format('H:i') : null;
        $endTime = $hasEndTime ? $end->format('H:i') : null;

        // Build the visible date range.
        $dateRange = $this->formatSpanishDateRange($start, $end);

        // Build the visible time range.
        $timeRange = null;

        if ($time) {
            $timeRange = $time;

            if ($end && $start->isSameDay($end) && $endTime) {
                $timeRange = $time . ' – ' . $endTime;
            }
        }

        // Render the event detail page with all data needed by React.
        return Inertia::render('events/show', [
            'event' => [
                'id' => $event->id,
                'titulo' => $event->title,
                'slug' => $event->slug,

                // Show "Online" as the place when the event is online.
                'lugar' => $event->is_online ? 'Online' : $event->location,

                'fecha' => $dateRange,
                'hora' => $timeRange,
                'fin' => $event->end_at
                    ? ($hasEndTime
                        ? $event->end_at->format('d/m/Y H:i')
                        : $event->end_at->format('d/m/Y'))
                    : null,
                'descripcion' => $event->description,
                'contenido' => $event->content,

                // Convert the Cloudinary stored path into a public URL.
                'imagen' => $this->resolveOptimizedCloudinaryImageUrl(
                    $event->image_url,
                    'f_auto,q_auto:eco,c_fill,g_auto,w_1040,h_585'
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
