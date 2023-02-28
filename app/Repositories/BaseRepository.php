<?php

namespace App\Repositories;

use App\Traits\Helper;

class BaseRepository
{
    use Helper;

    protected function customPaginate($payload): array
    {
        return [
            'data' => $payload['data'],
            'current_page' => $payload['current_page'],
            'last_page' => $payload['last_page'],
            'per_page' => $payload['per_page'],
            'from' => $payload['from'],
            'to' => $payload['to'],
            'total' => $payload['total'],
        ];
    }
}

