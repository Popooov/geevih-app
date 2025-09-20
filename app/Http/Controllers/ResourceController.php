<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResourceController extends Controller
{
    public function index()
    {
        return Inertia::render('resources/index', [
            'breadcrumbs' => [
                ['label' => 'Inicio', 'href' => route('home', absolute: false) ?? '/'],
                ['label' => 'Recursos', 'href' => route('resources.index', absolute: false)],
            ],
        ]);
    }

    public function guides()
    {
        return Inertia::render('resources/guides', [
            'breadcrumbs' => [
                ['label' => 'Inicio', 'href' => route('home', absolute: false) ?? '/'],
                ['label' => 'Recursos', 'href' => route('resources.index', absolute: false)],
                ['label' => 'Guías y Protocolos', 'href' => route('resources.guides', absolute: false)],
            ],
        ]);
    }

    public function herramientas()
    {
        return Inertia::render('resources/herramientas', [
            'breadcrumbs' => [
                ['label' => 'Inicio', 'href' => route('home', absolute: false) ?? '/'],
                ['label' => 'Recursos', 'href' => route('recursos.index', absolute: false)],
                ['label' => 'Herramientas Prácticas', 'href' => route('recursos.herramientas', absolute: false)],
            ],
        ]);
    }

    public function biblioteca()
    {
        return Inertia::render('resources/biblioteca', [
            'breadcrumbs' => [
                ['label' => 'Inicio', 'href' => route('home', absolute: false) ?? '/'],
                ['label' => 'Recursos', 'href' => route('recursos.index', absolute: false)],
                ['label' => 'Biblioteca de Artículos Científicos', 'href' => route('recursos.biblioteca', absolute: false)],
            ],
        ]);
    }

    public function material()
    {
        return Inertia::render('resources/material', [
            'breadcrumbs' => [
                ['label' => 'Inicio', 'href' => route('home', absolute: false) ?? '/'],
                ['label' => 'Recursos', 'href' => route('recursos.index', absolute: false)],
                ['label' => 'Material de Apoyo al Paciente', 'href' => route('recursos.material', absolute: false)],
            ],
        ]);
    }

    public function enlaces()
    {
        return Inertia::render('resources/Enlaces', [
            'breadcrumbs' => [
                ['label' => 'Inicio', 'href' => route('home', absolute: false) ?? '/'],
                ['label' => 'Recursos', 'href' => route('recursos.index', absolute: false)],
                ['label' => 'Links de interés', 'href' => route('recursos.enlaces', absolute: false)],
            ],
        ]);
    }
}
