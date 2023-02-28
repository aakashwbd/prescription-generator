<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            DiseaseSeeder::class,
            GenericSeeder::class,
            IndicationSeeder::class,
            ManufacturerSeeder::class,
            MedicineTypeSeeder::class,
            PregnancyCategorySeeder::class,
            StrengthSeeder::class,
            TherapeuticClassSeeder::class,
            MedicineSeeder::class,
            UserSeeder::class,
            PageSetupSeeder::class
        ]);
    }
}
