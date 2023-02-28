<?php

namespace App\Observers;

use App\Models\Prescription;

class PrescriptionObserver
{
    /**
     * Handle the Prescription "created" event.
     *
     * @param  \App\Models\Prescription  $prescription
     * @return void
     */
    public function created(Prescription $prescription)
    {
        $userPrescription = Prescription::select(['registration_no'])->where([
            'user_id' => auth()->id(),
            'name' => $prescription->name,
            'mobile' => $prescription->mobile
        ])->first();

        if($userPrescription && $userPrescription->registration_no){
            $prescription->update(['registration_no' => $userPrescription['registration_no']]);
        }else{
            $currentRegNo = Prescription::where(['user_id' => auth()->id()])->count();
            $prescription->update(['registration_no' => $currentRegNo]);
        }

        if($prescription->status === 'pending'){
            $todayAppoint = Prescription::query()
                ->whereDay('created_at', today()->day)
                ->whereMonth('created_at', today()->month)
                ->whereYear('created_at', today()->year)
                ->where('status', 'pending')
                ->count();
            $prescription->update(['appoint_no' => $todayAppoint]);
        }
    }

    /**
     * Handle the Prescription "updated" event.
     *
     * @param  \App\Models\Prescription  $prescription
     * @return void
     */
    public function updated(Prescription $prescription)
    {
        //
    }

    /**
     * Handle the Prescription "deleted" event.
     *
     * @param  \App\Models\Prescription  $prescription
     * @return void
     */
    public function deleted(Prescription $prescription)
    {
        //
    }

    /**
     * Handle the Prescription "restored" event.
     *
     * @param  \App\Models\Prescription  $prescription
     * @return void
     */
    public function restored(Prescription $prescription)
    {
        //
    }

    /**
     * Handle the Prescription "force deleted" event.
     *
     * @param  \App\Models\Prescription  $prescription
     * @return void
     */
    public function forceDeleted(Prescription $prescription)
    {
        //
    }
}
