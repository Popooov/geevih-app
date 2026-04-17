<?php

namespace App\Observers;

use App\Models\Resource as ContentResource;
use Cloudinary\Api\Admin\AdminApi;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Storage;

class ContentResourceObserver
{
    private function deleteRaw(?string $publicIdOrFileUrl): void
    {
        if (! $publicIdOrFileUrl) {
            return;
        }

        $base = ltrim($publicIdOrFileUrl, '/');
        $baseNoExt = preg_replace('/\.pdf$/i', '', $base);

        $candidates = [
            $baseNoExt,
            $baseNoExt . '.pdf',
        ];

        $tryDeleteExact = function (string $publicId): bool {
            try {
                $res = Cloudinary::uploadApi()->destroy($publicId, [
                    'resource_type' => 'raw',
                    'invalidate' => true,
                ]);

                $result = data_get($res, 'result');

                if ($result === 'ok') {
                    return true;
                }

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

        foreach ($candidates as $publicId) {
            if ($tryDeleteExact($publicId)) {
                return;
            }
        }

        try {
            $admin = new AdminApi();

            $prefix = $baseNoExt;
            $foundPublicIds = [];

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
                $admin->deleteAssets($foundPublicIds, [
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
        if (! $path) {
            return;
        }

        try {
            Storage::disk('cloudinary')->delete($path);
        } catch (\Throwable $e) {
            logger()->warning('Failed to delete image asset', [
                'path' => $path,
                'err' => $e->getMessage(),
            ]);
        }
    }

    public function updating(ContentResource $resource): void
    {
        if ($resource->isDirty('type') && $resource->type === 'enlaces') {
            $this->deleteRaw($resource->getOriginal('file_url'));
            $resource->file_url = null;
        }

        if ($resource->isDirty('access_mode') && $resource->access_mode === 'url') {
            $old = $resource->getOriginal('file_url');

            if ($old) {
                $this->deleteRaw($old);
            }

            $resource->file_url = null;
        }

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
