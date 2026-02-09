<?php

namespace App\Filament\Resources\ResourceResource\Pages;

use App\Filament\Resources\ResourceResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditResource extends EditRecord
{
    protected static string $resource = ResourceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $fileTmp = $this->data['file_tmp'] ?? null;

        if (($data['type'] ?? null) === 'enlaces') {
            $data['file_url'] = null;
            $data['image_url'] = null;
            unset($data['file_tmp']);
            return $data;
        }

        if (filled($fileTmp)) {
            $current  = $this->record?->file_url; // "resources/xxx.pdf"
            $publicId = $current ? preg_replace('/\.[^.]+$/', '', $current) : null;

            $uploaded = ResourceResource::uploadPdfToCloudinary($fileTmp, $publicId);

            if ($uploaded !== null) {
                $data['file_url'] = $uploaded; // mismo path si se reusa el public_id
            }
        }

        unset($data['file_tmp']);
        return $data;
    }
}
