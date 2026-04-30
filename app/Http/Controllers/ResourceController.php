<?php

namespace App\Http\Controllers;

use App\Models\Resource as ContentResource;
use Carbon\Carbon;
use Inertia\Inertia;

class ResourceController extends Controller
{
    /**
     * Resolve a public Cloudinary URL from a stored path.
     *
     * $type can be either 'image' or 'raw'.
     */
    private function resolveCloudinaryUrl(?string $path, string $type = 'raw'): ?string
    {
        // Return null when there is no stored path.
        if (! $path) {
            return null;
        }

        // If the path is already a full URL, return it directly.
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        // Try to get the Cloudinary cloud name from the environment.
        $cloud = env('CLOUDINARY_CLOUD_NAME') ?: null;

        // If CLOUDINARY_CLOUD_NAME is not available, try to extract it from CLOUDINARY_URL.
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
                    // Ignore parsing errors and keep the fallback behavior.
                }
            }
        }

        // If the cloud name cannot be resolved, no URL can be generated.
        if (! $cloud) {
            return null;
        }

        // Normalize the stored path and select the Cloudinary resource type.
        $publicPath = ltrim($path, '/');
        $resourceType = $type === 'image' ? 'image' : 'raw';

        // For raw resources, append .pdf when the stored path has no extension.
        if ($resourceType === 'raw' && ! preg_match('/\.[a-z0-9]+$/i', $publicPath)) {
            $publicPath .= '.pdf';
        }

        // Build the final public Cloudinary URL.
        return "https://res.cloudinary.com/{$cloud}/{$resourceType}/upload/{$publicPath}";
    }

    /**
     * Format a date manually in Spanish.
     */
    private function formatSpanishDate(mixed $date): string
    {
        // Return an empty string when no date is available.
        if (! $date) {
            return '';
        }

        try {
            // Convert DateTime instances or parse string dates into a Carbon instance.
            $c = $date instanceof \DateTime
                ? Carbon::instance($date)
                : Carbon::parse($date);

            // Spanish month names used to avoid depending on locale configuration.
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

            // Build the final date parts.
            $dia = $c->format('j');
            $mesNombre = $meses[(int) $c->format('n') - 1];
            $anio = $c->format('Y');

            // Return the date in Spanish readable format.
            return "{$dia} de {$mesNombre} de {$anio}";
        } catch (\Throwable $e) {
            // Return an empty string if the date cannot be parsed.
            return '';
        }
    }

    /**
     * Map a Resource model into the structure expected by the frontend.
     */
    private function mapResource(ContentResource $r): array
    {
        // Resolve the public image URL, if the resource has an image.
        $imageUrl = $this->resolveCloudinaryUrl($r->image_url, 'image');

        // Decide which URL should be used as the main resource link.
        if ($r->type === 'enlaces') {
            // Link resources always use the external link URL.
            $resourceUrl = $r->link_url ?: null;
        } else {
            // Other resources can use either an external URL or a Cloudinary file.
            $resourceUrl = $r->access_mode === 'url'
                ? ($r->link_url ?: null)
                : $this->resolveCloudinaryUrl($r->file_url, 'raw');
        }

        return [
            'id' => $r->id,
            'titulo' => $r->title,

            // Convert internal resource type values into user-facing labels.
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

            // Cast the pinned flag to boolean for consistent frontend handling.
            'is_pinned' => (bool) $r->is_pinned,
        ];
    }

    /**
     * Build the base query shared by all resource category pages.
     */
    private function baseQuery()
    {
        return ContentResource::query()
            // Show pinned resources first.
            ->orderByDesc('is_pinned')

            // Then order pinned resources by their custom order.
            ->orderBy('pin_order')

            // Then sort by publication date, newest first.
            ->orderByDesc('published_at')

            // Finally, use ID as a fallback ordering.
            ->orderByDesc('id');
    }

    /**
     * Paginate resources that belong to multiple types.
     */
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

            // Keep filters structure available for the frontend, even if currently empty.
            'filters' => request()->only([]),
        ];
    }

    /**
     * Paginate resources that belong to a single type.
     */
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

            // Keep filters structure available for the frontend, even if currently empty.
            'filters' => request()->only([]),
        ];
    }

    public function guides()
    {
        // Render the guides page with both guide and protocol resources.
        return Inertia::render('resources/guides', $this->paginateTypes(['guias', 'protocolos']));
    }

    public function tools()
    {
        // Render the tools page with practical tool resources.
        return Inertia::render('resources/tools', $this->paginateCategory('herramientas'));
    }

    public function library()
    {
        // Render the scientific library page.
        return Inertia::render('resources/library', $this->paginateCategory('biblioteca'));
    }

    public function material()
    {
        // Render the patient/support material page.
        return Inertia::render('resources/material', $this->paginateCategory('material'));
    }

    public function links()
    {
        // Render the useful links page.
        return Inertia::render('resources/links', $this->paginateCategory('enlaces'));
    }
}
