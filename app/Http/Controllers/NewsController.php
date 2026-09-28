<?php

namespace App\Http\Controllers;

use App\Models\News;
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

    private const CLOUDINARY_IMAGE_BASE_URL =
        'https://res.cloudinary.com/dnke4qnie/image/upload/';

    private function resolveImageUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'https://') || str_starts_with($path, 'http://')) {
            return $path;
        }

        return self::CLOUDINARY_IMAGE_BASE_URL . ltrim($path, '/');
    }

    public function index()
    {
        $allNews = News::query()
            ->where('is_published', true)
            ->orderByDesc('published_at')
            ->get();

        return Inertia::render('news/index', [
            'news' => $allNews->map(function (News $news): array {
                $imagePath = $news->image_url;

                return [
                    'id' => $news->id,
                    'titulo' => $news->title,
                    'fecha' => $this->formatSpanishDate($news->published_at),
                    'descripcion' => $news->summary,
                    'contenido' => $news->content,
                    'imagen' => $this->resolveImageUrl($news->image_url),
                    'slug' => $news->slug,
                    'is_featured' => (bool) $news->is_featured,
                ];
            }),
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
                'imagen'      => $this->resolveImageUrl($news->image_url),

                // Optional external source link
                'source_url'  => $news->source_url,
            ],
        ]);
    }
}
