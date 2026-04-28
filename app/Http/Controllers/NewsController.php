<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        // Retrieve all published news ordered by publication date (latest first)
        $allNews = News::query()
            ->where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->get();

        return Inertia::render('news/index', [
            // Transform each News model into a simplified structure for the frontend
            'news' => $allNews->map(fn ($news) => [
                'id'          => $news->id,

                // Title of the news item
                'titulo'      => $news->title,

                // Format publication date for display (human-readable format)
                'fecha'       => $news->published_at?->toFormattedDateString(),

                // Short summary used in listing views
                'descripcion' => $news->summary,

                // Full content (included here, possibly for previews or reuse)
                'contenido'   => $news->content,

                // Generate public URL from Cloudinary if image exists
                'imagen'      => $news->image_url
                    ? Storage::disk('cloudinary')->url($news->image_url)
                    : null,

                // Slug used for routing to detail page
                'slug'        => $news->slug,

                // Cast featured flag to boolean for consistent frontend usage
                'is_featured' => (bool) $news->is_featured,
            ]),
        ]);
    }

    public function show(News $news)
    {
        // Ensure the news item is published, otherwise return 404
        abort_unless($news->is_published, 404);

        return Inertia::render('news/show', [
            // Prepare single news item for detail view
            'singleNews' => [
                'id'          => $news->id,

                // Title of the news item
                'titulo'      => $news->title,

                // Formatted publication date
                'fecha'       => $news->published_at?->toFormattedDateString(),

                // Short summary
                'descripcion' => $news->summary,

                // Full article content
                'contenido'   => $news->content,

                // Public image URL from Cloudinary (if exists)
                'imagen'      => $news->image_url
                    ? Storage::disk('cloudinary')->url($news->image_url)
                    : null,

                // Optional external source link
                'source_url'  => $news->source_url,
            ],
        ]);
    }
}
