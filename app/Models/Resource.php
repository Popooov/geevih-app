<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Resource extends Model
{
    use SoftDeletes;

    protected $casts = [
        'published_at' => 'datetime',
        'is_pinned' => 'boolean',
        'pin_order' => 'integer',
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
        'deleted_at',
        'is_pinned',
        'pin_order',
        'access_mode',
    ];

    /**
     * Get the formatted published date (simple).
     */
    public function getFormattedPublishedAtAttribute(): ?string
    {
        return $this->published_at ? $this->published_at->format('d M Y') : null;
    }

    public function isLinkType(): bool
    {
        return $this->type === 'enlaces';
    }

    public function usesExternalUrl(): bool
    {
        return $this->type === 'enlaces' || $this->access_mode === 'url';
    }

    public function usesFile(): bool
    {
        return $this->type !== 'enlaces' && $this->access_mode === 'file';
    }
}
