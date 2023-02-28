<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Staudenmeir\EloquentJsonRelations\HasJsonRelationships;

class MedicineType extends Model
{
    use HasFactory, HasJsonRelationships;

    protected $fillable = [
        'user_id',
        'name',
        'generic_ids',
        'status'
    ];

    protected $casts = [
        'generic_ids' => 'array'
    ];

    public function generics()
    {
        return $this->belongsToJson(Generic::class, 'generics_ids');
    }
}
