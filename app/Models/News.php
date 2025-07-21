<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = [
        'title',
        'published_at',
        'summary',
        'content',
        'image_url',
    ];

    /**
     * Get the formatted published date for the news.
     *
     * @return string
     */
    public function getFormattedPublishedAtAttribute()
    {
        return $this->published_at->format('d M Y');
    }
}
