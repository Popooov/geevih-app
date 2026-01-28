<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('slug')->unique();

            $table->dateTime('start_at')->index();
            $table->dateTime('end_at')->nullable();

            $table->string('location')->nullable();

            $table->boolean('is_online')->default(false);
            $table->string('online_url')->nullable();

            $table->string('registration_url')->nullable();

            $table->text('description')->nullable();
            $table->longText('content')->nullable();

            $table->string('image_url')->nullable();
            $table->string('image_alt')->nullable();

            $table->boolean('is_published')->default(false)->index();
            $table->dateTime('published_at')->nullable()->index();

            $table->timestamps();
            $table->softDeletes();

            $table->index(['is_published', 'start_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
