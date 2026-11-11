<?php

namespace App\Support;

use Illuminate\Support\Str;

final class SharePreview
{
    public static function make(
        string $type,
        string $title,
        string $url,
        string $description,
        ?string $imageUrl,
        ?string $imageAlt,
        string $fallbackImage,
    ): array {
        $imageUrl = CloudinaryImageUrl::transform($imageUrl, 'c_limit,f_jpg,h_1200,q_auto:eco,w_1200');

        return [
            'type' => $type,
            'title' => $title,
            'url' => $url,
            'description' => Str::limit(Str::squish($description), 180, '…', preserveWords: true),
            'image' => $imageUrl ?: asset($fallbackImage),
            'imageAlt' => $imageUrl ? (trim($imageAlt ?? '') ?: $title) : 'GEEVIH · SEISIDA',
        ];
    }
}
