<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('slug')->unique();

            $table->boolean('is_published')->default(false)->index();
            $table->boolean('is_featured')->default(false);

            $table->dateTime('published_at')->nullable()->index();

            $table->text('summary')->nullable();
            $table->longText('content')->nullable();

            $table->string('image_url')->nullable();
            $table->string('image_alt')->nullable();

            $table->string('source_url')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->index(['is_published', 'published_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
