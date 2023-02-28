<?php

namespace Database\Seeders;

use App\Models\TherapeuticClass;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TherapeuticClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TherapeuticClass::factory()->count(100)->create();
    }
}
