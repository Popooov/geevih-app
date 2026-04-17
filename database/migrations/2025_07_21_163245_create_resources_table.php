<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('summary')->nullable();
            $table->enum('type', ['guias', 'protocolos', 'herramientas', 'biblioteca', 'material', 'enlaces']);
            $table->boolean('is_pinned')->default(false);
            $table->unsignedInteger('pin_order')->nullable();
            $table->enum('access_mode', ['file', 'url'])->default('file');
            $table->string('file_url')->nullable();
            $table->string('link_url')->nullable();
            $table->string('image_url')->nullable();
            $table->date('published_at')->nullable();
            $table->date('deleted_at')->nullable();
            $table->timestamps();

            $table->softDeletes();

            $table->index(['type', 'published_at']);
            $table->index(['is_pinned', 'pin_order', 'published_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resources');
    }
};
