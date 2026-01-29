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

        // Próximos o en curso: (end_at >= now) o (sin end_at y start_at >= now)
        $upcoming = (clone $base)
            ->where(function ($q) use ($now) {
                $q->whereNotNull('end_at')->where('end_at', '>=', $now)
                ->orWhere(function ($q2) use ($now) {
                    $q2->whereNull('end_at')->where('start_at', '>=', $now);
                });
            })
            ->orderBy('start_at', 'asc')
            ->get();

        // Pasados: (end_at < now) o (sin end_at y start_at < now)
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

            // Formatos
            $date = $start?->translatedFormat('d M Y'); // ej: 28 ene 2026
            $time = $start?->format('H:i');

            // Si hay end_at, puedes mostrar rango (opcional)
            $endTime = $end?->format('H:i');
            $dateRange = $end
                ? ($start->isSameDay($end)
                    ? $start->translatedFormat('d M Y') // mismo día
                    : $start->translatedFormat('d M') . ' – ' . $end->translatedFormat('d M Y'))
                : $date;

            $timeRange = $end
                ? ($start->isSameDay($end)
                    ? $time . ' – ' . $endTime
                    : $time) // si es multi-día, mejor solo hora inicio
                : $time;

            return [
                'id'          => $event->id,
                'titulo'      => $event->title,
                'lugar'       => $event->is_online ? 'Online' : $event->location,
                'fecha'       => $dateRange,   // <- ahora más útil
                'hora'        => $timeRange,   // <- ahora más útil
                'descripcion' => $event->description,
                'imagen'      => $event->image_url ? Storage::disk('cloudinary')->url($event->image_url) : null,
                'link'        => route('events.show', $event),

                'registration_url' => $event->registration_url,
                'online_url'       => $event->online_url,
                'is_online'        => $event->is_online,

                // 👇 nuevos flags para la tarjeta (opcional)
                'isPast'     => $isPast,
                'isOngoing'  => $isOngoing,
            ];
        };

        return Inertia::render('events/index', [
            'upcomingEvents' => $upcoming->map($mapEvent)->values(),
            'pastEvents'     => $past->map($mapEvent)->values(),
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
