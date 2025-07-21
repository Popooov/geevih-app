<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'date',
        'description',
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
