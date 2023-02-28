<?php

namespace Database\Factories;

use App\Models\Generic;
use App\Models\Manufacturer;
use App\Models\MedicineType;
use App\Models\PregnancyCategory;
use App\Models\Strength;
use App\Models\TherapeuticClass;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Medicine>
 */
class MedicineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'medicine_type_id' => MedicineType::select('id')->where('id', mt_rand(1,10))->first()->id,
            'pregnancy_category_id' => PregnancyCategory::select('id')->where('id', mt_rand(1,5))->first()->id,
            'manufacturer_id' => Manufacturer::select('id')->where('id', mt_rand(1,50))->first()->id,
            'generic_id' => Generic::select('id')->where('id', mt_rand(1,100))->first()->id,
            'therapeutic_class_id' => TherapeuticClass::select('id')->where('id', mt_rand(1,100))->first()->id,
            'strength_id' => Strength::select('id')->where('id', mt_rand(1,100))->first()->id,
            'adult_dose' => $this->faker->text,
            'child_dose' => $this->faker->text,
            'renal_dose' => $this->faker->text,
            'administration' => $this->faker->text,
            'indication' => $this->faker->text,
            'contraindication' => $this->faker->text,
            'side_effect' => $this->faker->text,
            'interaction' => $this->faker->text,
            'package_prices' => [
                ['price' => mt_rand(10,100), 'package' => '50ml'],
                ['price' => mt_rand(10,100), 'package' => '60ml'],
                ['price' => mt_rand(10,100), 'package' => '100ml'],
            ]
        ];
    }
}
