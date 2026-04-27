<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function members()
    {
        // Get all published members, ordered first by custom sort order
        // and then by ID to keep a stable fallback order.
        $members = Member::query()
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        // Render the Inertia page and pass the formatted members data
        // to the frontend component.
        return Inertia::render('about/about', [
            'members' => $members->map(fn ($m) => [
                // Basic member information
                'id'          => $m->id,
                'name'        => $m->name,
                'role'        => $m->role,
                'affiliation' => $m->affiliation,
                'summary'     => $m->summary,
                'bio'         => $m->bio,
                'email'       => $m->email,

                // Generate a public Cloudinary URL if the member has a photo.
                // If no photo exists, return null.
                'photo_url'   => $m->photo_url
                    ? Storage::disk('cloudinary')->url($m->photo_url)
                    : null,

                // External links
                'website_url'  => $m->website_url,
                'linkedin_url' => $m->linkedin_url,
            ]),
        ]);
    }
}
