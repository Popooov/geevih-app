<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $casts = [
        'date' => 'datetime',
    ];

    protected $fillable = [
        'title',
        'date',
        'location',
        'description',
        'content',
        'image_url',
    ];

    /**
     * Get the formatted date for the event.
     *
     * @return string
     */
    public function getFormattedDateAttribute()
    {
        return $this->date->format('d M Y');
    }
}
