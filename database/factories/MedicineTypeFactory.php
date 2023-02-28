<?php

namespace Database\Factories;

use App\Models\Generic;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MedicineType>
 */
class MedicineTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $genericIds = [];
        $generics = Generic::select('id')->get()->random(mt_rand(1, 5));
        foreach ($generics as $generic){
            $genericIds[] = $generic['id'];
        }

        return [
            'name' => $this->faker->word,
            'generic_ids' => $genericIds
        ];
    }
}
