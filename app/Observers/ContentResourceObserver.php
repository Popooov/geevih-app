<?php

namespace App\Observers;

use App\Models\Resource as ContentResource;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Storage;
use Cloudinary\Api\Admin\AdminApi;

class ContentResourceObserver
{
    private function deleteRaw(?string $publicIdOrFileUrl): void
    {
        if (! $publicIdOrFileUrl) return;

        $base = ltrim($publicIdOrFileUrl, '/');                 // "resources/<id>" o "resources/<id>.pdf"
        $baseNoExt = preg_replace('/\.pdf$/i', '', $base);      // "resources/<id>"

        // Candidatos exactos (sin y con .pdf)
        $candidates = [
            $baseNoExt,                 // resources/<id>
            $baseNoExt . '.pdf',        // resources/<id>.pdf (legacy)
        ];

        // Helper: intenta borrar por public_id exacto
        $tryDeleteExact = function (string $publicId): bool {
            try {
                // 1) Upload API destroy
                $res = Cloudinary::uploadApi()->destroy($publicId, [
                    'resource_type' => 'raw',
                    'invalidate' => true,
                ]);

                $result = data_get($res, 'result');

                if ($result === 'ok') {
                    return true;
                }

                // 2) Admin API deleteAssets (requiere ARRAY)
                $admin = new AdminApi();
                $res2 = $admin->deleteAssets([$publicId], [
                    'resource_type' => 'raw',
                    'type' => 'upload',
                ]);

                $deleted = data_get($res2, "deleted.$publicId");

                if ($deleted === 'deleted') {
                    return true;
                }
            } catch (\Throwable $e) {
                logger()->warning('Cloudinary RAW delete failed', [
                    'public_id' => $publicId,
                    'err' => $e->getMessage(),
                ]);
            }

            return false;
        };

        // 1) Intenta borrar por public_id exacto (sin y con .pdf)
        foreach ($candidates as $publicId) {
            if ($tryDeleteExact($publicId)) {
                return;
            }
        }

        // 2) Fallback final: listar por prefix y borrar TODO lo que encuentre
        // Esto cubre casos donde Cloudinary "normaliza" o se te coló la extensión.
        try {
            $admin = new AdminApi();

            // Buscamos assets raw cuyo public_id empiece por resources/<id>
            $prefix = $baseNoExt; // resources/<id>
            $foundPublicIds = [];

            // resourcesByPrefix devuelve una lista paginable; aquí hacemos un fetch simple.
            $list = $admin->assets([
                'resource_type' => 'raw',
                'type' => 'upload',
                'prefix' => $prefix,
                'max_results' => 100,
            ]);

            $resources = data_get($list, 'resources', []);
            foreach ($resources as $r) {
                $pid = data_get($r, 'public_id');
                if (is_string($pid) && $pid !== '') {
                    $foundPublicIds[] = $pid;
                }
            }

            $foundPublicIds = array_values(array_unique($foundPublicIds));

            if (! empty($foundPublicIds)) {
                $res3 = $admin->deleteAssets($foundPublicIds, [
                    'resource_type' => 'raw',
                    'type' => 'upload',
                ]);
            }
        } catch (\Throwable $e) {
            logger()->warning('Cloudinary RAW prefix delete failed', [
                'base' => $baseNoExt,
                'err' => $e->getMessage(),
            ]);
        }
    }

    private function deleteImage(?string $path): void
    {
        if (! $path) return;

        try {
            Storage::disk('cloudinary')->delete($path);
        } catch (\Throwable $e) {
            logger()->warning('Failed to delete image asset', [
                'path' => $path,
                'err'  => $e->getMessage(),
            ]);
        }
    }

    public function updating(ContentResource $resource): void
    {
        if ($resource->isDirty('type') && $resource->type === 'enlaces') {
            $this->deleteRaw($resource->getOriginal('file_url'));
            $this->deleteImage($resource->getOriginal('image_url'));

            $resource->file_url = null;
            $resource->image_url = null;
            return;
        }

        // Si alguna vez cambiases el file_url (modo B), aquí borraría el anterior.
        if ($resource->isDirty('file_url')) {
            $old = $resource->getOriginal('file_url');
            if ($old && $old !== $resource->file_url) {
                $this->deleteRaw($old);
            }
        }

        if ($resource->isDirty('image_url')) {
            $old = $resource->getOriginal('image_url');
            if ($old && $old !== $resource->image_url) {
                $this->deleteImage($old);
            }
        }
    }

    public function deleting(ContentResource $resource): void
    {
        if (! $resource->isForceDeleting()) {
            return;
        }

        $this->deleteRaw($resource->file_url);
        $this->deleteImage($resource->image_url);
    }
}
