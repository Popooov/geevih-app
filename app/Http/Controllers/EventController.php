<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index(Request $request, ?EventCategory $category = null)
    {
        $now = now();

        $filter = $request->string('filter')->toString();
        if (!in_array($filter, ['all', 'online', 'presencial'], true)) {
            $filter = 'all';
        }

        $base = Event::query()
            ->with('category')
            ->where('is_published', true)
            ->when($category, fn ($q) => $q->where('event_category_id', $category->id))
            ->when($filter === 'online', fn ($q) => $q->where('is_online', true))
            ->when($filter === 'presencial', fn ($q) => $q->where('is_online', false));

        $upcoming = (clone $base)
            ->where(function ($q) use ($now) {
                $q->where(function ($q1) use ($now) {
                    $q1->whereNotNull('end_at')
                        ->where('end_at', '>=', $now);
                })->orWhere(function ($q2) use ($now) {
                    $q2->whereNull('end_at')
                        ->where('start_at', '>=', $now);
                });
            })
            ->orderBy('start_at', 'asc')
            ->get();

        $pastPaginator = (clone $base)
            ->where(function ($q) use ($now) {
                $q->where(function ($q1) use ($now) {
                    $q1->whereNotNull('end_at')
                        ->where('end_at', '<', $now);
                })->orWhere(function ($q2) use ($now) {
                    $q2->whereNull('end_at')
                        ->where('start_at', '<', $now);
                });
            })
            ->orderBy('start_at', 'desc')
            ->paginate(6)
            ->withQueryString();

        return Inertia::render('events/index', [
            'upcomingEvents' => $upcoming
                ->map(fn (Event $event) => $this->mapEvent($event, $now))
                ->values(),

            'pastEvents' => collect($pastPaginator->items())
                ->map(fn (Event $event) => $this->mapEvent($event, $now))
                ->values(),

            'pastPagination' => [
                'current_page' => $pastPaginator->currentPage(),
                'last_page' => $pastPaginator->lastPage(),
                'total' => $pastPaginator->total(),
            ],

            'currentCategory' => $category ? [
                'name' => $category->name,
                'slug' => $category->slug,
            ] : null,

            'currentFilter' => $filter,
        ]);
    }

    public function show(Event $event)
    {
        abort_unless($event->is_published, 404);

        return Inertia::render('events/show', [
            'event' => [
                'id' => $event->id,
                'titulo' => $event->title,
                'lugar' => $event->is_online ? 'Online' : $event->location,
                'fecha' => $event->start_at?->toFormattedDateString(),
                'hora' => $event->start_at?->format('H:i'),
                'fin' => $event->end_at?->format('d/m/Y H:i'),
                'descripcion' => $event->description,
                'contenido' => $event->content,
                'imagen' => $event->image_url ? Storage::disk('cloudinary')->url($event->image_url) : null,
                'registration_url' => $event->registration_url,
                'online_url' => $event->online_url,
                'is_online' => $event->is_online,
                'category' => $event->category?->name,
                'category_slug' => $event->category?->slug,
            ],
        ]);
    }

    private function mapEvent(Event $event, $now): array
    {
        $start = $event->start_at;
        $end = $event->end_at;

        $isPast = ($end ?? $start)?->lt($now) ?? false;
        $isOngoing = $end ? ($start->lte($now) && $end->gte($now)) : false;

        $date = $start?->translatedFormat('d M Y');
        $time = $start?->format('H:i');
        $endTime = $end?->format('H:i');

        $dateRange = $end
            ? ($start->isSameDay($end)
                ? $start->translatedFormat('d M Y')
                : $start->translatedFormat('d M') . ' – ' . $end->translatedFormat('d M Y'))
            : $date;

        $timeRange = $end
            ? ($start->isSameDay($end)
                ? $time . ' – ' . $endTime
                : $time)
            : $time;

        return [
            'id' => $event->id,
            'titulo' => $event->title,
            'lugar' => $event->location,
            'fecha' => $dateRange,
            'hora' => $timeRange,
            'descripcion' => $event->description,
            'imagen' => $event->image_url ? Storage::disk('cloudinary')->url($event->image_url) : null,
            'link' => route('events.show', $event),

            'registration_url' => $event->registration_url,
            'online_url' => $event->online_url,
            'is_online' => $event->is_online,

            'isPast' => $isPast,
            'isOngoing' => $isOngoing,

            'category' => $event->category?->name,
            'category_slug' => $event->category?->slug,
        ];
    }
}
