<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Carbon\Carbon;

class NewsController extends Controller
{
    /**
     * Format a date manually in Spanish.
     */
    private function formatSpanishDate(mixed $date): string
    {
        if (! $date) {
            return '';
        }

        try {
            $c = $date instanceof \DateTime
                ? Carbon::instance($date)
                : Carbon::parse($date);

            $meses = [
                'enero',
                'febrero',
                'marzo',
                'abril',
                'mayo',
                'junio',
                'julio',
                'agosto',
                'septiembre',
                'octubre',
                'noviembre',
                'diciembre',
            ];

            $dia = $c->format('j');
            $mesNombre = $meses[(int) $c->format('n') - 1];
            $anio = $c->format('Y');

            return "{$dia} de {$mesNombre} de {$anio}";
        } catch (\Throwable $e) {
            return '';
        }
    }

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
                'fecha'       => $this->formatSpanishDate($news->published_at),

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
                'fecha'       => $this->formatSpanishDate($news->published_at),

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
