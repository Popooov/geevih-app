<?php

namespace App\Http\Controllers;

use App\Models\Resource as ContentResource;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
    private function mapResource(ContentResource $r): array
    {
        // Usamos el accessor del modelo para obtener la URL pública (o null)
        $url = $r->file_public_url;

        return [
            'id'     => $r->id,
            'titulo' => $r->title,
            'tipo'   => match ($r->type) {
                'guias' => 'Guía',
                'herramientas' => 'Herramienta',
                'biblioteca' => 'Artículo',
                'material' => 'Material',
                default => ucfirst((string) $r->type),
            },
            'fecha'  => optional($r->published_at)?->locale('es')->translatedFormat('LL') ?? '',
            'enlace' => $url,
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
        return Inertia::render('resources/guides', $this->paginateCategory('guias'));
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
