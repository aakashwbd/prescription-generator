<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrescriptionSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'font_size',
        'line_per_page',
        'visit_fee',
        're_visit_fee',
        're_visit_validity',
        'default_revisit_count',
        'barcode_display',
        'barcode_position',
        'multiple_page_print',
        'visit_no_display',
        'patient_info',
        'name_display',
        'age_display',
        'gender_display',
        'weight_display',
        'date_display',
        'address_display',
        'registration_no_display',
        'mobile_display',
        'cubic_centimeter_display',
        'on_examination_display',
        'advice_display',
        'disease_display',
        'footer_display',
        'print_past_history',
        'print_present_history',
        'print_notes',
        'print_edd',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
