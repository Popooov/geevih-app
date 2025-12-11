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
    protected function resolveCloudinaryUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        // Si ya es URL absoluta la devolvemos
        if (str_starts_with($path, 'http')) {
            return $path;
        }

        // Intentamos Storage (puede lanzar exceptions si credenciales fallan)
        try {
            $url = Storage::disk('cloudinary')->url($path);
            if ($url) {
                return $url;
            }
        } catch (\Throwable $e) {
            // opcional: loguear para debugging
            logger()->debug('Storage::disk(cloudinary)->url failed', [
                'path' => $path,
                'error' => $e->getMessage(),
            ]);
        }

        // Fallback CDN (no requiere API): cloud name extraído de CLOUDINARY_URL
        $cloudinaryUrl = env('CLOUDINARY_URL', env('CLOUDINARY_API_URL', ''));
        if ($cloudinaryUrl && str_contains($cloudinaryUrl, '@')) {
            $parts = explode('@', $cloudinaryUrl);
            $cloudName = $parts[1] ?? null;
            if ($cloudName) {
                $publicPath = ltrim($path, '/');
                // Para ficheros PDF usamos raw/upload, para imagenes image/upload
                // Aquí no sabemos el tipo, asumimos que si ext es pdf => raw, else image
                $ext = strtolower(pathinfo($publicPath, PATHINFO_EXTENSION));
                $resourceType = in_array($ext, ['pdf','doc','docx','xls','xlsx','ppt','pptx']) ? 'raw' : 'image';
                return "https://res.cloudinary.com/{$cloudName}/{$resourceType}/upload/{$publicPath}";
            }
        }

        return null;
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
                default => ucfirst((string) $r->type),
            },
            'fecha'  => $fecha,
            'imagen' => Storage::disk('cloudinary')->url($imageUrl),
            'enlace' => $fileUrl,
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
}
