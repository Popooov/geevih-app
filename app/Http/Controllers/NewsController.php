<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        // Fetch all news items ordered by published date
        // and map them to the format expected by the frontend.
        // Adjust the field names as necessary based on your News model.
        // The image_url field is assumed to be stored in Cloudinary.
        // If the image_url is null, it will not be included in the response.
        $allNews = News::orderBy('published_at', 'desc')->get();

        return Inertia::render('news/index', [
            'news' => $allNews->map(fn($news) => [
                'id'          => $news->id,
                'titulo'      => $news->title,
                'fecha'       => $news->published_at->toFormattedDateString(),
                'descripcion' => $news->summary,
                'contenido'   => $news->content,
                'imagen'      => Storage::disk('cloudinary')->url($news->image_url),
                // 'link'        => route('news.show', $news),
            ]),
        ]);
    }

    public function show(News $news)
    {
        // Fetch a single news item by its ID and return it to the frontend.
        return Inertia::render('news/show', [
            'singleNews' => [
                'id'          => $news->id,
                'titulo'      => $news->title,
                'fecha'       => $news->published_at->toFormattedDateString(),
                'descripcion' => $news->summary,
                'contenido'   => $news->content,
                'imagen'      => Storage::disk('cloudinary')->url($news->image_url),
            ],
        ]);
    }

    // Additional methods for handling news can be added here
}
