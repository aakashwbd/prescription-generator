<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('login', [\App\Http\Controllers\Api\Auth\LoginController::class, 'login']);

    Route::prefix('register')->group(function () {
        Route::post('', [\App\Http\Controllers\Api\Auth\RegisterController::class, 'register']);
        Route::post('verify', [\App\Http\Controllers\Api\Auth\RegisterController::class, 'verifyOtp']);
        Route::post('resend', [\App\Http\Controllers\Api\Auth\RegisterController::class, 'resendOtp']);
    });

    Route::middleware('auth:api')->group(function () {
        Route::post('refresh', [\App\Http\Controllers\Api\Auth\LoginController::class, 'refresh']);
        Route::post('logout', [\App\Http\Controllers\Api\Auth\LoginController::class, 'logout']);
        Route::post('change-password', [\App\Http\Controllers\Api\Auth\ResetController::class, 'changePassword']);
    });

    Route::prefix('reset')->group(function () {
        Route::post('request', [\App\Http\Controllers\Api\Auth\ResetController::class, 'resetRequest']);
        Route::post('verify', [\App\Http\Controllers\Api\Auth\ResetController::class, 'verifyOtp']);
        Route::post('confirm', [\App\Http\Controllers\Api\Auth\ResetController::class, 'resetConfirm']);
    });
});

Route::middleware('auth:api')->group(function () {
    Route::get('prescription-summary', [\App\Http\Controllers\Api\PrescriptionController::class, 'summary']);
    Route::apiResource('prescriptions', \App\Http\Controllers\Api\PrescriptionController::class)->except(['create', 'edit']);
    Route::apiResource('diseases', \App\Http\Controllers\Api\DiseaseController::class)->except(['create', 'edit']);
    Route::apiResource('generics', \App\Http\Controllers\Api\GenericController::class)->except(['create', 'edit']);
    Route::apiResource('indications', \App\Http\Controllers\Api\IndicationController::class)->except(['create', 'edit']);
    Route::apiResource('manufacturers', \App\Http\Controllers\Api\ManufacturerController::class)->except(['create', 'edit']);
    Route::apiResource('medicines', \App\Http\Controllers\Api\MedicineController::class)->except(['create', 'edit']);
    Route::apiResource('medicine-types', \App\Http\Controllers\Api\MedicineTypeController::class)->except(['create', 'edit']);
    Route::apiResource('pregnancy-categories', \App\Http\Controllers\Api\PregnancyCategoryController::class)->except(['create', 'edit']);
    Route::apiResource('strengths', \App\Http\Controllers\Api\StrengthController::class)->except(['create', 'edit']);
    Route::apiResource('therapeutic-classes', \App\Http\Controllers\Api\TherapeuticClassController::class)->except(['create', 'edit']);
    Route::apiResource('page-setups', \App\Http\Controllers\Api\PageSetupController::class)->except(['create', 'edit']);
    Route::apiResource('prescription-settings', \App\Http\Controllers\Api\PrescriptionSettingController::class)->except(['create', 'edit']);
    Route::apiResource('template-settings', \App\Http\Controllers\Api\TemplateSettingController::class)->except(['create', 'edit']);

    Route::prefix('templates')->group(function () {
        Route::apiResource('advices', \App\Http\Controllers\Api\Template\AdviceController::class)->except(['create', 'edit']);
        Route::apiResource('cubic-centimeters', \App\Http\Controllers\Api\Template\CubicCentimeterController::class)->except(['create', 'edit']);
        Route::apiResource('doses', \App\Http\Controllers\Api\Template\DoseController::class)->except(['create', 'edit']);
        Route::apiResource('durations', \App\Http\Controllers\Api\Template\DurationController::class)->except(['create', 'edit']);
        Route::apiResource('investigations', \App\Http\Controllers\Api\Template\InvestigationController::class)->except(['create', 'edit']);
        Route::apiResource('medicines', \App\Http\Controllers\Api\Template\MedicineController::class)->except(['create', 'edit']);
        Route::apiResource('on-examinations', \App\Http\Controllers\Api\Template\OnExaminationController::class)->except(['create', 'edit']);
        Route::apiResource('on-examination-options', \App\Http\Controllers\Api\Template\OnExaminationOptionController::class)->except(['create', 'edit']);
        Route::apiResource('treatments', \App\Http\Controllers\Api\Template\TreatmentController::class)->except(['create', 'edit']);
    });
});
