<?php

namespace App\Models\Templates;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicineTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'medicines',
        'status'
    ];

    protected $casts = [
        'medicines' => 'array'
    ];
}
