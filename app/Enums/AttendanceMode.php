<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum AttendanceMode: string implements HasLabel
{
    case InPerson = 'in_person';
    case Online = 'online';
    case Hybrid = 'hybrid';

    public function getLabel(): string
    {
        return match ($this) {
            self::InPerson => 'Presencial',
            self::Online => 'Online',
            self::Hybrid => 'Híbrido',
        };
    }

    public function allowsOnline(): bool
    {
        return $this !== self::InPerson;
    }

    public function allowsInPerson(): bool
    {
        return $this !== self::Online;
    }
}
