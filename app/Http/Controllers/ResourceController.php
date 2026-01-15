<?php

namespace App\Http\Controllers;

use App\Models\Resource as ContentResource;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class ResourceController extends Controller
{
    /**
     * Helper: intenta resolver Storage::disk('cloudinary')->url($path)
     * Si falla, intenta construir una URL pública CDN básica como fallback.
     */
    private function resolveCloudinaryUrl(?string $path, string $type = 'raw'): ?string
    {
        if (! $path) {
            return null;
        }

        // si ya es URL absoluta, devolvemos
        if (str_starts_with($path, 'http')) {
            return $path;
        }

        // 1) Intento con el adapter (puede lanzar NotFound o 401)
        try {
            $url = Storage::disk('cloudinary')->url($path);
            if ($url) {
                return $url;
            }
        } catch (\Throwable $e) {
            // log para depuración y seguir al fallback
            logger()->warning('Cloudinary adapter failed to resolve url', [
                'path' => $path,
                'error' => $e->getMessage(),
            ]);
        }

        // 2) Fallback: construir CDN URL explícita
        // Preferimos CLOUDINARY_CLOUD_NAME en .env
        $cloud = env('CLOUDINARY_CLOUD_NAME') ?: null;
        if (! $cloud) {
            $cloudly = env('CLOUDINARY_URL', env('CLOUDINARY_API_URL', ''));
            if ($cloudly && str_contains($cloudly, '@')) {
                $parts = explode('@', $cloudly, 2);
                $cloud = $parts[1] ?? null;
            } else {
                // intentar extraer de /v1_1/<cloud>/
                try {
                    $parsed = parse_url($cloudly);
                    if (! empty($parsed['path'])) {
                        $segments = array_values(array_filter(explode('/', $parsed['path'])));
                        $idx = array_search('v1_1', $segments, true);
                        if ($idx !== false && isset($segments[$idx + 1])) {
                            $cloud = $segments[$idx + 1];
                        }
                    }
                } catch (\Throwable $ee) { /* ignore */ }
            }
        }

        if (! $cloud) {
            return null;
        }

        $publicPath = ltrim($path, '/');

        // forzamos raw para documentos; image para imágenes
        $resourceType = $type === 'image' ? 'image' : 'raw';

        return "https://res.cloudinary.com/{$cloud}/{$resourceType}/upload/{$publicPath}";
    }

    private function mapResource(ContentResource $r): array
    {
        // Formateo seguro y en español sin depender de intl
        $fecha = '';
        if ($r->published_at) {
            try {
                $c = $r->published_at instanceof \DateTime
                    ? Carbon::instance($r->published_at)
                    : Carbon::parse($r->published_at);

                $meses = [
                    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
                ];

                $dia = $c->format('j'); // 1..31 sin ceros
                $mesNombre = $meses[(int) $c->format('n') - 1];
                $anio = $c->format('Y');

                $fecha = "{$dia} de {$mesNombre} de {$anio}"; // e.g. "6 de noviembre de 2025"
            } catch (\Throwable $e) {
                $fecha = '';
            }
        }

        // Ahora usamos $r->file_url y $r->image_url que devuelven la URL pública gracias a los accessors
        $fileUrl = $r->file_url ?? null;
        $imageUrl = $r->image_url ?? null;

        return [
            'id'     => $r->id,
            'titulo' => $r->title,
            'tipo'   => match ($r->type) {
                'guias' => 'Guía',
                'protocolos' => 'Protocolo',
                'herramientas' => 'Herramienta',
                'biblioteca' => 'Artículo',
                'material' => 'Material',
                'links' => 'Enlace',
                default => ucfirst((string) $r->type),
            },
            'fecha'  => $fecha,
            'imagen' => Storage::disk('cloudinary')->url($imageUrl),
            'enlace' => $this->resolveCloudinaryUrl($fileUrl, 'raw'),
        ];
    }

    private function paginateTypes(array $types, string $pageName = 'page'): array
    {
        $paginated = ContentResource::whereIn('type', $types)
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->paginate(9, ['*'], $pageName)
            ->through(fn (ContentResource $r) => $this->mapResource($r));

        return [
            'resources' => $paginated->items(),
            'pagination' => [
                'current_page' => $paginated->currentPage(),
                'last_page'    => $paginated->lastPage(),
                'per_page'     => $paginated->perPage(),
                'total'        => $paginated->total(),
            ],
            'filters' => request()->only([]),
        ];
    }

    private function paginateCategory(string $type, string $pageName = 'page'): array
    {
        $paginated = ContentResource::where('type', $type)
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->paginate(9, ['*'], $pageName)
            ->through(fn (ContentResource $r) => $this->mapResource($r));

        return [
            'resources' => $paginated->items(),
            'pagination' => [
                'current_page' => $paginated->currentPage(),
                'last_page'    => $paginated->lastPage(),
                'per_page'     => $paginated->perPage(),
                'total'        => $paginated->total(),
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
