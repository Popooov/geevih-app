<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Support\SharePreview;
use Carbon\Carbon;
use Cloudinary\Cloudinary;
use Illuminate\Support\Str;
use Inertia\Inertia;

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

    private function resolveImageUrl(?string $path): ?string
    {
        $path = trim($path ?? '');

        if ($path === '') {
            return null;
        }

        if (str_starts_with($path, 'https://') || str_starts_with($path, 'http://')) {
            return $path;
        }

        return (string) app(Cloudinary::class)
            ->image(ltrim($path, '/'))
            ->secure()
            ->toUrl();
    }

    public function index()
    {
        $allNews = News::query()
            ->where('is_published', true)
            ->orderByDesc('published_at')
            ->get();

        return Inertia::render('news/index', [
            'news' => $allNews->map(function (News $news): array {
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

        $imageUrl = $this->resolveImageUrl($news->image_url);
        $link = route('news.show', $news);

        // The rich-text editor can leave empty paragraphs in a brief notice.
        $content = $news->content;
        $visibleContent = html_entity_decode(
            strip_tags($content ?? '', ['img', 'audio', 'video', 'iframe', 'embed', 'object', 'svg', 'math']),
            ENT_QUOTES | ENT_HTML5,
            'UTF-8'
        );

        $previewDescription = Str::squish($news->summary ?? '');

        if ($previewDescription === '') {
            $paragraphs = preg_replace('~</(?:p|li|div|h[1-6]|blockquote)\s*>|<br\b[^>]*>~i', ' ', $content ?? '');
            $previewDescription = html_entity_decode(strip_tags($paragraphs ?? ''), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        }

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
                'contenido'   => preg_match('/[^\s\p{Z}\p{Cf}]/u', $visibleContent) === 1 ? $content : null,

                // Public image URL from Cloudinary (if exists)
                'imagen'      => $imageUrl,
                'image_alt'   => $news->image_alt,

                // Optional external source link
                'source_url'  => $news->source_url,
                'link'        => $link,
            ],
        ])->withViewData('sharePreview', SharePreview::make(
            type: 'article',
            title: $news->title,
            url: $link,
            description: $previewDescription,
            imageUrl: $imageUrl,
            imageAlt: $news->image_alt,
            fallbackImage: 'images/news-share.jpg',
        ));
    }
}
