<?php

namespace App\Constants;

class HttpStatuses
{
    public const int HTTP_OK = 200;
    public const int HTTP_CREATED = 201;
    public const int HTTP_NO_CONTENT = 204;
    public const int HTTP_UNAUTHORIZED = 401;
    public const int HTTP_NOT_FOUND = 404;

    public static function getStatusMessage($code): string
    {
        return match($code) {
            self::HTTP_CREATED => 'Created',
            self::HTTP_NO_CONTENT => 'No Content',
            self::HTTP_UNAUTHORIZED => 'Unauthorized',
            self::HTTP_NOT_FOUND => 'Not Found',
            default => 'Unknown Status',
        };
    }

}
