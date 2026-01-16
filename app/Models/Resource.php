<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    protected $casts = [
        'published_at' => 'datetime',
    ];

    protected $fillable = [
        'title',
        'type',
        'file_url',
        'image_url',
        'summary',
        'content',
        'link_url',
        'published_at',
    ];

    /**
     * Get the formatted published date (simple).
     */
    public function getFormattedPublishedAtAttribute()
    {
        return $this->published_at ? $this->published_at->format('d M Y') : null;
    }
}
