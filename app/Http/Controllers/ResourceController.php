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
     *
     * $type: 'image' or 'raw'
     */
    private function resolveCloudinaryUrl(?string $path, string $type = 'raw'): ?string
    {
        if (! $path) return null;

        // Si ya es una URL absoluta -> devolver tal cual
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        $cloud = env('CLOUDINARY_CLOUD_NAME') ?: null;
        if (! $cloud) {
            $cloudly = env('CLOUDINARY_URL', env('CLOUDINARY_API_URL', ''));
            if ($cloudly && str_contains($cloudly, '@')) {
                $parts = explode('@', $cloudly, 2);
                $cloud = $parts[1] ?? null;
            } else {
                try {
                    $parsed = parse_url($cloudly);
                    if (! empty($parsed['path'])) {
                        $segments = array_values(array_filter(explode('/', $parsed['path'])));
                        $idx = array_search('v1_1', $segments, true);
                        if ($idx !== false && isset($segments[$idx + 1])) {
                            $cloud = $segments[$idx + 1];
                        }
                    }
                } catch (\Throwable $ee) {
                    // ignore
                }
            }
        }

        if (! $cloud) return null;

        $publicPath = ltrim($path, '/');

        // ✅ Si es RAW y NO hay extensión, añadimos ".pdf"
        // (como ahora guardas public_id sin extensión en BD)
        if ($type !== 'image' && ! preg_match('/\.[a-z0-9]+$/i', $publicPath)) {
            $publicPath .= '.pdf';
        }

        $resourceType = $type === 'image' ? 'image' : 'raw';

        // ✅ Para PDFs/RAW, mejor devolver directo sin pasar por el adapter
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

        // description: preferimos summary, si no existe usamos content
        $descripcion = $r->summary ?? $r->content ?? null;

        // Decide enlace / archivo según tipo
        if ($r->type === 'enlaces') {
            // Enlaces externos: usamos el campo `link` tal cual
            $fileUrl = $r->link_url ?? null;
            // Imagen (opcional) puede existir; resolvemos si hay valor
            $imageUrl = $this->resolveCloudinaryUrl($r->image_url, 'image');
        } else {
            $fileUrl = $this->resolveCloudinaryUrl($r->file_url, 'raw');
            $imageUrl = $this->resolveCloudinaryUrl($r->image_url, 'image');
        }

        return [
            'id'        => $r->id,
            'titulo'    => $r->title,
            'tipo'      => match ($r->type) {
                'guias' => 'Guía',
                'protocolos' => 'Protocolo',
                'herramientas' => 'Herramienta',
                'biblioteca' => 'Artículo',
                'material' => 'Material',
                'enlaces' => 'Enlace de interés',
                default => ucfirst((string) $r->type),
            },
            'fecha'     => $fecha,
            'descripcion' => $descripcion,
            'imagen'    => $imageUrl,
            'enlace'    => $fileUrl,
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
