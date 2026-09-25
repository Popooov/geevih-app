<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;

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
                    'imagen' => $imagePath
                        ? Cache::store('file')->remember(
                            'news:cloudinary-url:' . hash('sha256', (string) $imagePath),
                            now()->addMinutes(30),
                            fn (): string => Storage::disk('cloudinary')->url($imagePath),
                        )
                        : null,
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
                'imagen'      => $news->image_url
                    ? Storage::disk('cloudinary')->url($news->image_url)
                    : null,

                // Optional external source link
                'source_url'  => $news->source_url,
            ],
        ]);
    }
}
