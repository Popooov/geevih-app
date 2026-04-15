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
        $now = now();

        $base = Event::query()
            ->with('category')
            ->where('is_published', true)
            ->when($category, fn ($q) => $q->where('event_category_id', $category->id));

        $upcoming = (clone $base)
            ->where(function ($q) use ($now) {
                $q->whereNotNull('end_at')->where('end_at', '>=', $now)
                    ->orWhere(function ($q2) use ($now) {
                        $q2->whereNull('end_at')->where('start_at', '>=', $now);
                    });
            })
            ->orderBy('start_at', 'asc')
            ->get();

        $past = (clone $base)
            ->where(function ($q) use ($now) {
                $q->whereNotNull('end_at')->where('end_at', '<', $now)
                    ->orWhere(function ($q2) use ($now) {
                        $q2->whereNull('end_at')->where('start_at', '<', $now);
                    });
            })
            ->orderBy('start_at', 'desc')
            ->get();

        $mapEvent = function (Event $event) use ($now) {
            $start = $event->start_at;
            $end = $event->end_at;

            $isPast = ($end ?? $start)?->lt($now) ?? false;
            $isOngoing = $end ? ($start->lte($now) && $end->gte($now)) : false;

            $time = $start?->format('H:i');
            $endTime = $end?->format('H:i');

            $dateRange = $end
                ? ($start->isSameDay($end)
                    ? $start->translatedFormat('d M Y')
                    : $start->translatedFormat('d M') . ' – ' . $end->translatedFormat('d M Y'))
                : $start?->translatedFormat('d M Y');

            $timeRange = $end
                ? ($start->isSameDay($end)
                    ? $time . ' – ' . $endTime
                    : $time)
                : $time;

            $categorySlug = $event->category?->slug;

            return [
                'id' => $event->id,
                'titulo' => $event->title,
                'slug' => $event->slug,
                'lugar' => $event->is_online ? 'Online' : $event->location,
                'fecha' => $dateRange,
                'hora' => $timeRange,
                'descripcion' => $event->description,
                'imagen' => $event->image_url ? Storage::disk('cloudinary')->url($event->image_url) : null,

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
        abort_unless($event->is_published, 404);
        abort_unless($event->event_category_id === $category->id, 404);

        $now = now();
        $start = $event->start_at;
        $end = $event->end_at;

        $isOngoing = $end ? ($start->lte($now) && $end->gte($now)) : false;

        $time = $start?->format('H:i');
        $endTime = $end?->format('H:i');

        $dateRange = $end
            ? ($start->isSameDay($end)
                ? $start->translatedFormat('d M Y')
                : $start->translatedFormat('d M') . ' – ' . $end->translatedFormat('d M Y'))
            : $start?->translatedFormat('d M Y');

        $timeRange = $end
            ? ($start->isSameDay($end)
                ? $time . ' – ' . $endTime
                : $time)
            : $time;

        return Inertia::render('events/show', [
            'event' => [
                'id' => $event->id,
                'titulo' => $event->title,
                'slug' => $event->slug,
                'lugar' => $event->is_online ? 'Online' : $event->location,
                'fecha' => $dateRange,
                'hora' => $timeRange,
                'fin' => $event->end_at?->format('d/m/Y H:i'),
                'descripcion' => $event->description,
                'contenido' => $event->content,
                'imagen' => $event->image_url ? Storage::disk('cloudinary')->url($event->image_url) : null,

                'registration_url' => $event->registration_url,
                'online_url' => $event->online_url,
                'is_online' => $event->is_online,
                'isOngoing' => $isOngoing,

                'category' => $event->category?->name,
                'category_slug' => $event->category?->slug,

                'backLink' => route('training.category', $category->slug),
                'link' => route('training.show', [
                    'category' => $category->slug,
                    'event' => $event->slug,
                ]),
            ],
        ]);
    }
}
