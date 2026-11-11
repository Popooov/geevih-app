<?php

namespace App\Support;

final class CloudinaryImageUrl
{
    public static function transform(?string $url, string $transformation): ?string
    {
        if ($url === null || $url === '') {
            return $url;
        }

        // Signed URLs and URLs from other providers must be used as issued.
        return preg_replace(
            '~^(https?://res\.cloudinary\.com/[^/?#]+/image/upload/)(?!s--[^/]+--/)~i',
            '$1'.$transformation.'/',
            $url,
            1
        ) ?? $url;
    }
}
