<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EventCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'sort_order',
        'is_active',
    ];

    public function events(): HasMany
    {
        return $this->hasMany(Event::class, 'event_category_id');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
