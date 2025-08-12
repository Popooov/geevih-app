<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ResourceController extends Controller
{
    public function index()
    {
        $resources = [
            'guias' => 'Guías',
            'infografias' => 'Infografías',
            'documentos' => 'Documentos',
        ];
    }
}
