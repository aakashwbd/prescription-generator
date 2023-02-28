<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Staudenmeir\EloquentJsonRelations\HasJsonRelationships;

class Generic extends Model
{
    use HasFactory, HasJsonRelationships;

    protected $fillable = [
        'user_id',
        'name',
        'mode_of_action',
        'status'
    ];

    public function medicines()
    {
        return $this->hasMany(Medicine::class);
    }

    public function indications()
    {
        return $this->hasManyJson(Indication::class, 'generic_ids');
    }

    public function strengths()
    {
        return $this->hasManyJson(Strength::class, 'generic_ids');
    }

    public function therapeutic_classes()
    {
        return $this->hasManyJson(TherapeuticClass::class, 'generic_ids');
    }

    public function medicine_types()
    {
        return $this->hasManyJson(MedicineType::class, 'generic_ids');
    }
}
