<?php

namespace App\Models;

use App\Enums\AttendanceMode;
use App\Enums\ScheduleType;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\ValidationException;

class Event extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'start_at',
        'end_at',
        'attendance_mode',
        'schedule_type',
        'has_start_time',
        'has_end_time',
        'schedule_notes',
        'program_url',
        'location',
        'is_online',
        'online_url',
        'registration_url',
        'description',
        'content',
        'image_url',
        'image_alt',
        'is_published',
        'published_at',
        'event_category_id',
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
        'attendance_mode' => AttendanceMode::class,
        'schedule_type' => ScheduleType::class,
        'has_start_time' => 'boolean',
        'has_end_time' => 'boolean',
        'is_online' => 'boolean',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::saving(function (Event $event): void {
            if (! $event->start_at) {
                throw ValidationException::withMessages(['start_at' => 'La fecha de inicio es obligatoria.']);
            }

            $event->attendance_mode = $event->attendanceMode();
            $event->schedule_type = $event->scheduleType();

            $fixed = $event->scheduleType() === ScheduleType::Fixed;
            $event->has_start_time = $fixed && $event->start_at && (bool) $event->has_start_time;
            $event->has_end_time = $fixed && $event->end_at && (bool) $event->has_end_time;

            if ($event->start_at && ! $event->has_start_time) {
                $event->start_at = $event->start_at->copy()->startOfDay();
            }

            if ($event->end_at && ! $event->has_end_time) {
                $event->end_at = $event->end_at->copy()->startOfDay();
            }

            if ($event->end_at && $event->effectiveEndAt()->lt($event->effectiveStartAt())) {
                throw ValidationException::withMessages([
                    'end_at' => 'El fin debe ser igual o posterior al inicio.',
                ]);
            }

            // Compatibility with the previous column; attendance_mode is authoritative.
            $event->is_online = $event->attendanceMode()->allowsOnline();
        });
    }

    public function attendanceMode(): AttendanceMode
    {
        return $this->attendance_mode ?? ($this->is_online ? AttendanceMode::Online : AttendanceMode::InPerson);
    }

    public function scheduleType(): ScheduleType
    {
        return $this->schedule_type ?? ScheduleType::Fixed;
    }

    public function hasStartTime(): bool
    {
        return $this->scheduleType() === ScheduleType::Fixed && (bool) $this->has_start_time;
    }

    public function hasEndTime(): bool
    {
        return $this->scheduleType() === ScheduleType::Fixed && (bool) $this->has_end_time;
    }

    public function effectiveStartAt(): ?CarbonInterface
    {
        $start = $this->start_at?->copy();

        return $this->hasStartTime() ? $start : $start?->startOfDay();
    }

    public function effectiveEndAt(): ?CarbonInterface
    {
        if ($this->end_at) {
            $end = $this->end_at->copy();

            return $this->hasEndTime() ? $end : $end->endOfDay();
        }

        // A dated activity without an end remains in the current agenda for that day.
        // Sessions and availability periods need an explicit end before being archived.
        return $this->scheduleType() === ScheduleType::Fixed
            ? $this->start_at?->copy()->endOfDay()
            : null;
    }

    public function isPastAt(CarbonInterface $now): bool
    {
        return $this->effectiveEndAt()?->lt($now) ?? false;
    }

    public function isOngoingAt(CarbonInterface $now): bool
    {
        $start = $this->effectiveStartAt();
        $end = $this->effectiveEndAt();

        // A missing close does not establish an ongoing course or permanent access.
        return $this->end_at && $start && $end && $start->lte($now) && $end->gte($now);
    }

    public function statusLabelAt(CarbonInterface $now): ?string
    {
        if ($this->isPastAt($now)) {
            if (! $this->end_at) {
                return 'Actividad anterior';
            }

            return $this->scheduleType() === ScheduleType::Availability ? 'Acceso finalizado' : 'Finalizado';
        }

        if ($this->isOngoingAt($now)) {
            return $this->scheduleType() === ScheduleType::Availability ? 'Disponible' : 'En curso';
        }

        return null;
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(EventCategory::class, 'event_category_id');
    }

    public function getFormattedDateAttribute(): string
    {
        return $this->start_at?->toFormattedDateString() ?? '';
    }

    public function getFormattedTimeAttribute(): ?string
    {
        return $this->hasStartTime() ? $this->start_at?->format('H:i') : null;
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
