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
            ->select([
                'id',
                'name',
                'role',
                'affiliation',
                'summary',
                'bio',
                'email',
                'photo_url',
                'photo_alt',
                'website_url',
                'linkedin_url',
                'sort_order',
            ])
            ->where('is_published', true)
            ->orderByRaw('sort_order IS NULL')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return Inertia::render('about/about', [
            'members' => $members->map(fn ($m) => [
                'id'           => $m->id,
                'name'         => $m->name,
                'role'         => $m->role,
                'affiliation'  => $m->affiliation,
                'summary'      => $m->summary,
                'bio'          => $m->bio,
                'email'        => $m->email,
                'photo_url'    => $this->resolveOptimizedCloudinaryImageUrl($m->photo_url),
                'photo_alt'    => $m->photo_alt,
                'website_url'  => $m->website_url,
                'linkedin_url' => $m->linkedin_url,
            ]),
        ]);
    }

    private function resolveOptimizedCloudinaryImageUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        $transformations = 'f_auto,q_auto:eco,c_fill,g_auto,w_640,h_640';

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            if (str_contains($path, 'res.cloudinary.com') && str_contains($path, '/image/upload/')) {
                return preg_replace(
                    '#/image/upload/#',
                    "/image/upload/{$transformations}/",
                    $path,
                    1
                );
            }

            return $path;
        }

        $cloud = env('CLOUDINARY_CLOUD_NAME') ?: null;

        if (! $cloud) {
            $cloudinaryUrl = env('CLOUDINARY_URL', env('CLOUDINARY_API_URL', ''));

            if ($cloudinaryUrl && str_contains($cloudinaryUrl, '@')) {
                $parts = explode('@', $cloudinaryUrl, 2);
                $cloud = $parts[1] ?? null;
            } else {
                $parsed = parse_url($cloudinaryUrl);
                $host = $parsed['host'] ?? null;

                if ($host && str_contains($host, 'res.cloudinary.com')) {
                    $segments = explode('/', trim($parsed['path'] ?? '', '/'));
                    $cloud = $segments[0] ?? null;
                }
            }
        }

        if ($cloud) {
            return sprintf(
                'https://res.cloudinary.com/%s/image/upload/%s/%s',
                $cloud,
                $transformations,
                ltrim($path, '/')
            );
        }

        return Storage::disk('cloudinary')->url($path);
    }
}