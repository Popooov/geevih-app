<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $now = now();

        $base = Event::query()
            ->where('is_published', true);

        $upcoming = (clone $base)
            ->where('start_at', '>=', $now)
            ->orderBy('start_at', 'asc')
            ->get();

        $past = (clone $base)
            ->where('start_at', '<', $now)
            ->orderBy('start_at', 'desc')
            ->get();

        $mapEvent = fn (Event $event) => [
            'id'          => $event->id,
            'titulo'      => $event->title,
            'lugar'       => $event->is_online ? 'Online' : $event->location,
            'fecha'       => $event->start_at?->toFormattedDateString(),
            'hora'        => $event->start_at?->format('H:i'),
            'descripcion' => $event->description,
            'imagen'      => $event->image_url ? Storage::disk('cloudinary')->url($event->image_url) : null,
            'link'        => route('events.show', $event), // usará slug si configuras binding
            // extra opcional por si lo necesitas en la card
            'registration_url' => $event->registration_url,
            'online_url'       => $event->online_url,
            'is_online'        => $event->is_online,
        ];

        return Inertia::render('events/index', [
            'upcomingEvents' => $upcoming->map($mapEvent),
            'pastEvents'     => $past->map($mapEvent),
        ]);
    }

    public function show(Event $event)
    {
        abort_unless($event->is_published, 404);

        return Inertia::render('events/show', [
            'event' => [
                'id'          => $event->id,
                'titulo'      => $event->title,
                'lugar'       => $event->is_online ? 'Online' : $event->location,
                'fecha'       => $event->start_at?->toFormattedDateString(),
                'hora'        => $event->start_at?->format('H:i'),
                'fin'         => $event->end_at?->format('d/m/Y H:i'),
                'descripcion' => $event->description,
                'contenido'   => $event->content,
                'imagen'      => $event->image_url ? Storage::disk('cloudinary')->url($event->image_url) : null,
                'registration_url' => $event->registration_url,
                'online_url'       => $event->online_url,
                'is_online'        => $event->is_online,
            ],
        ]);
    }
}
