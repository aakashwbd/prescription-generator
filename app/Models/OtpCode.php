<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OtpCode extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'validate_till' => 'datetime',
    ];

    public const REGISTER_OTP_TYPE = 1;
    public const RESET_OTP_TYPE = 2;
}
