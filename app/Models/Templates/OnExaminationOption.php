<?php

namespace App\Models\Templates;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnExaminationOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'value',
        'position',
        'status'
    ];
}
