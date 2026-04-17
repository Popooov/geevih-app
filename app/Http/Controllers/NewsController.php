<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        $allNews = News::query()
            ->where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->get();

        return Inertia::render('news/index', [
            'news' => $allNews->map(fn ($news) => [
                'id'          => $news->id,
                'titulo'      => $news->title,
                'fecha'       => $news->published_at?->toFormattedDateString(),
                'descripcion' => $news->summary,
                'contenido'   => $news->content,
                'imagen'      => $news->image_url ? Storage::disk('cloudinary')->url($news->image_url) : null,
                'slug'        => $news->slug,
                'is_featured' => (bool) $news->is_featured,
            ]),
        ]);
    }

    public function show(News $news)
    {
        abort_unless($news->is_published, 404);

        return Inertia::render('news/show', [
            'singleNews' => [
                'id'          => $news->id,
                'titulo'      => $news->title,
                'fecha'       => $news->published_at?->toFormattedDateString(),
                'descripcion' => $news->summary,
                'contenido'   => $news->content,
                'imagen'      => $news->image_url ? Storage::disk('cloudinary')->url($news->image_url) : null,
                'source_url'  => $news->source_url,
            ],
        ]);
    }
}
