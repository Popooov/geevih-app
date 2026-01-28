<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'start_at',
        'end_at',
        'location',
        'is_online',
        'online_url',
        'registration_url',
        'description',
        'content',
        'image_url',
        'image_alt',
        'is_published',
        'published_at',
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
        'is_online' => 'boolean',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function getFormattedDateAttribute(): string
    {
        return $this->start_at?->toFormattedDateString() ?? '';
    }

    public function getFormattedTimeAttribute(): ?string
    {
        return $this->start_at?->format('H:i');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
