<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    use HasFactory;

    protected $fillable = [
        'appoint_no',
        'user_id',
        'name',
        'age',
        'gender',
        'address',
        'mobile',
        'registration_no',
        'date',
        'paid',
        'visit_no',
        'last_visit',
        'medicines',
        'cc',
        'ho',
        'oe',
        'dx',
        'ix',
        'plan',
        'oh',
        'mh',
        'after_come',
        'bmi',
        'insulin',
        'z_score',
        'bmr',
        'edd',
        'report_history',
        'ot_notes',
        'salient_features',
        'past_history',
        'medical_certificates',
        'others',
        'advices',
//        'printing',
        'status',
    ];

    protected $casts = [
        'date' => 'datetime',

        'medicine_list' => 'array',
        'medicines' => 'array',
        'cc' => 'array',
        'ho' => 'array',
        'oe' => 'array',
        'dx' => 'array',
        'ix' => 'array',
        'plan' => 'array',
        'oh' => 'array',
        'mh' => 'array',

//        'after_come' => 'array',
        'bmi' => 'array',
        'insulin' => 'array',
        'z_score' => 'array',
        'bmr' => 'array',
        'edd' => 'array',

        'report_history' => 'array',
        'ot_notes' => 'array',
        'salient_features' => 'array',
        'past_history' => 'array',
        'medical_certificates' => 'array',
        'others' => 'array',

//        'printing' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
