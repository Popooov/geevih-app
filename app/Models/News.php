<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class News extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'is_published',
        'is_featured',
        'published_at',
        'summary',
        'content',
        'image_url',
        'image_alt',
        'source_url',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_published' => 'boolean',
        'is_featured' => 'boolean',
    ];

    public function getFormattedPublishedAtAttribute(): string
    {
        return $this->published_at?->toFormattedDateString() ?? '';
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
