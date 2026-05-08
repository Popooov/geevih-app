<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventCategory;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventController extends Controller
{
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
            $dateRange = $end
                ? ($start->isSameDay($end)
                    ? $start->translatedFormat('d M Y')
                    : $start->translatedFormat('d M') . ' – ' . $end->translatedFormat('d M Y'))
                : $start?->translatedFormat('d M Y');

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
                'imagen' => $event->image_url ? Storage::disk('cloudinary')->url($event->image_url) : null,

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
        $dateRange = $end
            ? ($start->isSameDay($end)
                ? $start->translatedFormat('d M Y')
                : $start->translatedFormat('d M') . ' – ' . $end->translatedFormat('d M Y'))
            : $start?->translatedFormat('d M Y');

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
                'imagen' => $event->image_url ? Storage::disk('cloudinary')->url($event->image_url) : null,

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
