<?php

namespace App\Filament\Resources\EventResource\Pages;

use App\Filament\Resources\EventResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateEvent extends CreateRecord
{
    protected static string $resource = EventResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        // Slug único
        $data['slug'] = EventResource::uniqueSlug($data['slug'] ?? $data['title'], \App\Models\Event::class);

        // published_at auto
        if (($data['is_published'] ?? false) && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        // Si es online, location no obligatoria
        if (($data['is_online'] ?? false) && empty($data['location'])) {
            $data['location'] = null;
        }

        return $data;
    }
}
