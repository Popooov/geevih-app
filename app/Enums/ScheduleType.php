<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum ScheduleType: string implements HasLabel
{
    case Fixed = 'fixed';
    case Sessions = 'sessions';
    case Availability = 'availability';

    public function getLabel(): string
    {
        return match ($this) {
            self::Fixed => 'Con horario definido',
            self::Sessions => 'Por sesiones',
            self::Availability => 'Acceso flexible',
        };
    }
}
