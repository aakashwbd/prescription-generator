<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemplateSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'templates'
    ];

    protected $casts = [
        'templates' => 'array'
    ];
}
