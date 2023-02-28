<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'medicine_type_id',
        'pregnancy_category_id',
        'manufacturer_id',
        'generic_id',
        'therapeutic_class_id',
        'strength_id',
        'adult_dose',
        'child_dose',
        'renal_dose',
        'administration',
        'indication',
        'contraindication',
        'side_effect',
        'interaction',
        'package_prices',
        'status'
    ];

    protected $casts = [
        'package_prices' => 'array',
    ];

    public function medicine_type()
    {
        return $this->belongsTo(MedicineType::class);
    }

    public function pregnancy_category()
    {
        return $this->belongsTo(PregnancyCategory::class);
    }

    public function manufacturer()
    {
        return $this->belongsTo(Manufacturer::class);
    }

    public function generic()
    {
        return $this->belongsTo(Generic::class);
    }

    public function therapeutic_class()
    {
        return $this->belongsTo(TherapeuticClass::class);
    }

    public function strength()
    {
        return $this->belongsTo(Strength::class);
    }
}
