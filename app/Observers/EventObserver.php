<?php

namespace App\Observers;

use App\Models\Event;
use Illuminate\Support\Facades\Storage;

class EventObserver
{
    public function updating(Event $event): void
    {
        if (! $event->isDirty('image_url')) {
            return;
        }

        $old = $event->getOriginal('image_url');

        if ($old && $old !== $event->image_url) {
            Storage::disk('cloudinary')->delete($old);
        }
    }

    public function deleting(Event $event): void
    {
        // Si es soft delete → NO tocar Cloudinary
        if (! $event->isForceDeleting()) {
            return;
        }

        // Solo en force delete
        if ($event->image_url) {
            Storage::disk('cloudinary')->delete($event->image_url);
        }
    }
}
