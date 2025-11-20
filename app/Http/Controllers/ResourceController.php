<?php

namespace App\Http\Controllers;

use App\Models\Resource as ContentResource;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ResourceController extends Controller
{
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

                $dia = $c->format('j'); // 1..31
                $mesNombre = $meses[(int) $c->format('n') - 1];
                $anio = $c->format('Y');

                $fecha = "{$dia} de {$mesNombre} de {$anio}"; // ej: "6 de noviembre de 2025"
            } catch (\Throwable $e) {
                $fecha = '';
            }
        }

        $url = $r->file_public_url ?? null;

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
            'enlace' => $url,
        ];
    }

    /**
     * Paginación para varios tipos (por ejemplo ['guias','protocolos'])
     */
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
