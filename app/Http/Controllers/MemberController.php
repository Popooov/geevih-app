<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function members()
    {
        $members = Member::query()
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return Inertia::render('members', [
            'members' => $members->map(fn ($m) => [
                'id'         => $m->id,
                'nombre'     => $m->name,
                'filiacion'  => $m->affiliation,
                'resumen'    => $m->summary,
                'email'      => $m->email,
                // Convertimos public_id -> URL real (Cloudinary)
                'foto'       => $m->photo_url
                    ? Storage::disk('cloudinary')->url($m->photo_url)
                    : null,
            ]),
        ]);
    }
}
