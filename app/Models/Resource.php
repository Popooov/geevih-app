<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

class Resource extends Model
{
    use HasFactory;

    /**
     * Campos que se pueden asignar masivamente.
     * Ajusta según tu migración (añade/remueve campos si procede).
     */
    protected $fillable = [
        'title',
        'type',
        'summary',
        'content',
        'file_url',
        'published_at',
    ];

    /**
     * Casts.
     */
    protected $casts = [
        'published_at' => 'datetime',
    ];

    /**
     * Devuelve la URL pública del archivo asociada al recurso.
     *
     * - Si en file_url ya hay una URL (empieza por http), la devuelve tal cual.
     * - Si file_url es un path (p.ej. resources/XXXXX.pdf), intenta resolverlo
     *   a través del disco 'cloudinary' (Storage::disk('cloudinary')->url(...)).
     * - Si falla la resolución (excepción), registra una advertencia y devuelve null.
     *
     * Uso: $resource->file_public_url
     *
     * @return string|null
     */
    public function getFilePublicUrlAttribute(): ?string
    {
        $path = $this->attributes['file_url'] ?? null;

        if (! $path) {
            return null;
        }

        // Si ya es una URL absoluta, devolverla
        if (str_starts_with($path, 'http')) {
            return $path;
        }

        try {
            return Storage::disk('cloudinary')->url($path);
        } catch (\Throwable $e) {
            // Log para depuración — no rompemos la app en producción/dev
            logger()->warning('Cloudinary URL resolution failed for Resource', [
                'resource_id' => $this->id ?? null,
                'stored_value' => $path,
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }
}
