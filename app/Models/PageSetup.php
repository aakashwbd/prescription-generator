<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageSetup extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'header_size',
        'patient_info_size',
        'history_size',
        'footer_size',
        'prescribe_size',
        'prescription_size',
        'header_left_content',
        'header_right_content',
        'header_bg_color',
        'header_barcode_display',
        'footer_content',
    ];

    public const SIZES = [
        'header_size' => ["height" => "5.7","width" => "21.1"],
        'patient_info_size' => ["height" => "1.6","width" => "21.1"],
        'history_size' => ["height" => "19","width" => "7.6"],
        'footer_size' => ["height" => "1","width" => "21.1"],
        'prescribe_size' => ["height" => "19","width" => "13.3"],
        'prescription_size' => ["height" => "29.6","width" => "21.3"],
    ];

    protected $casts = [
        'header_size' => 'array',
        'patient_info_size' => 'array',
        'history_size' => 'array',
        'footer_size' => 'array',
        'prescribe_size' => 'array',
        'prescription_size' => 'array',
    ];
}
