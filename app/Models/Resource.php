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

        // 1) Si ya hay una URL absoluta guardada, devolverla
        if (str_starts_with($path, 'http')) {
            return $path;
        }

        // 2) Intentar resolver con Storage (adaptador Cloudinary)
        try {
            $url = Storage::disk('cloudinary')->url($path);
            if ($url) {
                return $url;
            }
        } catch (\Throwable $e) {
            // no hacemos nada aquí, pasamos a fallback CDN
            logger()->debug('Storage::disk(cloudinary)->url failed, using CDN fallback', [
                'resource_id' => $this->id,
                'stored_value' => $path,
                'error' => $e->getMessage(),
            ]);
        }

        // 3) Fallback: construir URL pública CDN (no requiere API)
        // Extraemos CLOUD_NAME de CLOUDINARY_URL: cloudinary://KEY:SECRET@CLOUD_NAME
        $cloudName = null;
        $cloudinaryUrl = env('CLOUDINARY_URL', env('CLOUDINARY_API_URL', ''));

        if ($cloudinaryUrl) {
            $parts = explode('@', $cloudinaryUrl);
            $cloudName = $parts[1] ?? null;
        }

        if ($cloudName) {
            // Aseguramos que la ruta quede bien: si file_url contiene "resources/...", la dejamos.
            $publicPath = ltrim($path, '/');
            // Usamos raw/upload para PDFs; si fueran images podría usarse image/upload
            return "https://res.cloudinary.com/{$cloudName}/raw/upload/{$publicPath}";
        }

        // 4) Si no podemos construir CDN, devolvemos null para no romper la vista
        return null;
    }
}
