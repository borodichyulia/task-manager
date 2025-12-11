<?php

namespace App\Enums;

enum StatusEnum: string
{
    case STATUS_PENDING = 'pending';
    case STATUS_IN_PROGRESS = 'in_progress';
    case STATUS_DONE = 'done';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
