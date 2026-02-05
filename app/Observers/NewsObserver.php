<?php

namespace App\Observers;

use App\Models\News;
use Illuminate\Support\Facades\Storage;

class NewsObserver
{
    public function updating(News $news): void
    {
        if (! $news->isDirty('image_url')) {
            return;
        }

        $old = $news->getOriginal('image_url');

        if ($old && $old !== $news->image_url) {
            Storage::disk('cloudinary')->delete($old);
        }
    }

    public function deleting(News $news): void
    {
        // Soft delete -> no tocar Cloudinary
        if (! $news->isForceDeleting()) {
            return;
        }

        // Force delete -> borrar en Cloudinary
        if ($news->image_url) {
            Storage::disk('cloudinary')->delete($news->image_url);
        }
    }
}
