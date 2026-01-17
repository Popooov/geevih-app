<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('affiliation');
            $table->text('summary');
            $table->string('email')->nullable();
            $table->string('photo_url')->nullable();

            // Opcional (para ordenar en la web)
            $table->unsignedInteger('sort_order')->default(0);

            // Publicación (por si quieres ocultar miembros)
            $table->boolean('is_published')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
