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
                'id'          => $m->id,
                'name'        => $m->name,
                'role'        => $m->role,
                'affiliation' => $m->affiliation,
                'summary'     => $m->summary,
                'bio'         => $m->bio,
                'email'       => $m->email,
                'photo_url'   => $m->photo_url ? Storage::disk('cloudinary')->url($m->photo_url) : null,
                'website_url' => $m->website_url,
                'linkedin_url'=> $m->linkedin_url,
            ]),
        ]);
    }
}
