<?php

namespace Database\Seeders;

use App\Models\PageSetup;
use App\Models\PrescriptionSetting;
use App\Models\TemplateSetting;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PageSetupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::select('id')->get();
        foreach ($users as $user){
            PageSetup::create([
                'user_id' => $user->id,
                'header_size' => PageSetup::SIZES['header_size'],
                'patient_info_size' => PageSetup::SIZES['patient_info_size'],
                'history_size' => PageSetup::SIZES['history_size'],
                'footer_size' => PageSetup::SIZES['footer_size'],
                'prescribe_size' => PageSetup::SIZES['prescribe_size'],
                'prescription_size' => PageSetup::SIZES['prescription_size'],
            ]);
            PrescriptionSetting::create(['user_id' => $user->id]);
            TemplateSetting::create([
               'user_id' => $user->id,
               'templates' => [
                   'medicine' => 'system+private',
                   'cubic_centimeter' => 'system+private',
                   'dose' => 'system+private',
                   'duration' => 'system+private',
                   'investigation' => 'system+private',
                   'on_examination' => 'system+private',
                   'treatment' => 'system+private',
                   'advice' => 'system+private',
               ]
            ]);
        }
    }
}
