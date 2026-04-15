<?php

namespace App\Filament\Resources\ResourceResource\Pages;

use App\Filament\Resources\ResourceResource;
use Filament\Resources\Pages\CreateRecord;

class CreateResource extends CreateRecord
{
    protected static string $resource = ResourceResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $fileTmp = $this->data['file_tmp'] ?? null;

        if (($data['type'] ?? null) === 'enlaces') {
            $data['access_mode'] = 'url';
            $data['file_url'] = null;
            unset($data['file_tmp']);

            return $data;
        }

        if (($data['access_mode'] ?? 'file') === 'url') {
            $data['file_url'] = null;
            unset($data['file_tmp']);

            return $data;
        }

        if (filled($fileTmp)) {
            $uploaded = ResourceResource::uploadPdfToCloudinary($fileTmp);

            if ($uploaded !== null) {
                $data['file_url'] = $uploaded;
            }
        }

        unset($data['file_tmp']);

        return $data;
    }
}
