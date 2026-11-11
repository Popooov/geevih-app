<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->string('attendance_mode', 20)->default('in_person');
            $table->string('schedule_type', 20)->default('fixed');
            $table->boolean('has_start_time')->default(false);
            $table->boolean('has_end_time')->default(false);
            $table->text('schedule_notes')->nullable();
            $table->string('program_url')->nullable();
        });

        // Preserve existing modalities and the previous date-only convention.
        // Query Builder avoids model events and changes to updated_at.
        DB::table('events')->where('is_online', true)->update(['attendance_mode' => 'online']);
        DB::table('events')->whereTime('start_at', '!=', '00:00:00')->update(['has_start_time' => true]);
        DB::table('events')->whereTime('end_at', '!=', '00:00:00')->update(['has_end_time' => true]);
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn([
                'attendance_mode',
                'schedule_type',
                'has_start_time',
                'has_end_time',
                'schedule_notes',
                'program_url',
            ]);
        });
    }
};
