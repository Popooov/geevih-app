<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContentResource extends Model
{
    protected $fillable = [
        'title',
        'type',
        'file_url',
    ];

    /**
     * Get the formatted type for the resource.
     *
     * @return string
     */
    public function getFormattedTypeAttribute()
    {
        return ucfirst($this->type);
    }
}
