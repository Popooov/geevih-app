<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();

            $table->string('name');

            $table->string('role')->nullable();
            $table->string('affiliation')->nullable();

            $table->text('summary')->nullable();
            $table->longText('bio')->nullable();

            $table->string('email')->nullable();
            $table->string('photo_url')->nullable();
            $table->string('photo_alt')->nullable();

            $table->string('website_url')->nullable();
            $table->string('linkedin_url')->nullable();

            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_published')->default(true)->index();

            $table->timestamps();
            $table->softDeletes();

            $table->index(['is_published', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
