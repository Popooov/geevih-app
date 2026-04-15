<?php

namespace App\Http\Controllers;

use App\Models\Resource as ContentResource;
use Carbon\Carbon;
use Inertia\Inertia;

class ResourceController extends Controller
{
    /**
     * Resuelve una URL pública de Cloudinary.
     *
     * $type: 'image' o 'raw'
     */
    private function resolveCloudinaryUrl(?string $path, string $type = 'raw'): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        $cloud = env('CLOUDINARY_CLOUD_NAME') ?: null;

        if (! $cloud) {
            $cloudinaryUrl = env('CLOUDINARY_URL', env('CLOUDINARY_API_URL', ''));

            if ($cloudinaryUrl && str_contains($cloudinaryUrl, '@')) {
                $parts = explode('@', $cloudinaryUrl, 2);
                $cloud = $parts[1] ?? null;
            } else {
                try {
                    $parsed = parse_url($cloudinaryUrl);

                    if (! empty($parsed['path'])) {
                        $segments = array_values(array_filter(explode('/', $parsed['path'])));
                        $idx = array_search('v1_1', $segments, true);

                        if ($idx !== false && isset($segments[$idx + 1])) {
                            $cloud = $segments[$idx + 1];
                        }
                    }
                } catch (\Throwable $e) {
                    // ignore
                }
            }
        }

        if (! $cloud) {
            return null;
        }

        $publicPath = ltrim($path, '/');
        $resourceType = $type === 'image' ? 'image' : 'raw';

        if ($resourceType === 'raw' && ! preg_match('/\.[a-z0-9]+$/i', $publicPath)) {
            $publicPath .= '.pdf';
        }

        return "https://res.cloudinary.com/{$cloud}/{$resourceType}/upload/{$publicPath}";
    }

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

    private function mapResource(ContentResource $r): array
    {
        $imageUrl = $this->resolveCloudinaryUrl($r->image_url, 'image');

        if ($r->type === 'enlaces') {
            $resourceUrl = $r->link_url ?: null;
        } else {
            $resourceUrl = $r->access_mode === 'url'
                ? ($r->link_url ?: null)
                : $this->resolveCloudinaryUrl($r->file_url, 'raw');
        }

        return [
            'id' => $r->id,
            'titulo' => $r->title,
            'tipo' => match ($r->type) {
                'guias' => 'Guía',
                'protocolos' => 'Protocolo',
                'herramientas' => 'Herramienta',
                'biblioteca' => 'Artículo',
                'material' => 'Material',
                'enlaces' => 'Enlace de interés',
                default => ucfirst((string) $r->type),
            },
            'fecha' => $this->formatSpanishDate($r->published_at),
            'descripcion' => $r->summary,
            'imagen' => $imageUrl,
            'enlace' => $resourceUrl,
            'is_pinned' => (bool) $r->is_pinned,
        ];
    }

    private function baseQuery()
    {
        return ContentResource::query()
            ->orderByDesc('is_pinned')
            ->orderBy('pin_order')
            ->orderByDesc('published_at')
            ->orderByDesc('id');
    }

    private function paginateTypes(array $types, string $pageName = 'page'): array
    {
        $paginated = $this->baseQuery()
            ->whereIn('type', $types)
            ->paginate(9, ['*'], $pageName)
            ->through(fn (ContentResource $r) => $this->mapResource($r));

        return [
            'resources' => $paginated->items(),
            'pagination' => [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
            ],
            'filters' => request()->only([]),
        ];
    }

    private function paginateCategory(string $type, string $pageName = 'page'): array
    {
        $paginated = $this->baseQuery()
            ->where('type', $type)
            ->paginate(9, ['*'], $pageName)
            ->through(fn (ContentResource $r) => $this->mapResource($r));

        return [
            'resources' => $paginated->items(),
            'pagination' => [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
            ],
            'filters' => request()->only([]),
        ];
    }

    public function guides()
    {
        return Inertia::render('resources/guides', $this->paginateTypes(['guias', 'protocolos']));
    }

    public function tools()
    {
        return Inertia::render('resources/tools', $this->paginateCategory('herramientas'));
    }

    public function library()
    {
        return Inertia::render('resources/library', $this->paginateCategory('biblioteca'));
    }

    public function material()
    {
        return Inertia::render('resources/material', $this->paginateCategory('material'));
    }

    public function links()
    {
        return Inertia::render('resources/links', $this->paginateCategory('enlaces'));
    }
}
