<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Event;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $today = now()->toDateString();

        $allEvents = Event::orderBy('date', 'desc')->get();

        $upcoming = $allEvents->filter(fn($e) => $e->date >= $today)->values();
        $past     = $allEvents->filter(fn($e) => $e->date  < $today)->values();

        return Inertia::render('events/index', [
            'upcomingEvents' => $upcoming->map(fn($event) => [
                'id'          => $event->id,
                'titulo'      => $event->title,
                'lugar'       => $event->location,
                'fecha'       => $event->date->toFormattedDateString(),
                'descripcion' => $event->description,
                'imagen'      => Storage::disk('cloudinary')->url($event->image_url),
                'link'        => route('events.show', $event),
            ]),
            'pastEvents' => $past->map(fn($event) => [
                'id'          => $event->id,
                'titulo'      => $event->title,
                'lugar'       => $event->location,
                'fecha'       => $event->date->toFormattedDateString(),
                'descripcion' => $event->description,
                'imagen'      => Storage::disk('cloudinary')->url($event->image_url),
                'link'        => route('events.show', $event),
            ]),
        ]);
    }

    public function show(Event $event)
    {
        return Inertia::render('events/show', [
            'event' => [
                'id'          => $event->id,
                'titulo'      => $event->title,
                'lugar'       => $event->location,
                'fecha'       => $event->date->toFormattedDateString(),
                'descripcion' => $event->description,
                'contenido'   => $event->content,
                'imagen'      => Storage::disk('cloudinary')->url($event->image_url),
            ],
        ]);
    }
}
