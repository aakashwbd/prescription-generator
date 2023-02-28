<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('page_setups', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('user_id')->nullable();
            $table->json('header_size')->nullable()->comment('Header Size {Width, Height} in CM');
            $table->json('patient_info_size')->nullable()->comment('Patient Info Size {Width, Height} in CM');
            $table->json('history_size')->nullable()->comment('History Size {Width, Height} in CM');
            $table->json('footer_size')->nullable()->comment('Footer Size {Width, Height} in CM');
            $table->json('prescribe_size')->nullable()->comment('Prescribe Size {Width, Height} in CM');
            $table->json('prescription_size')->nullable()->comment('Prescription Size {Width, Height} in CM');
            $table->text('header_left_content')->nullable();
            $table->text('header_right_content')->nullable();
            $table->string('header_bg_color')->nullable();
            $table->boolean('header_barcode_display')->nullable()->default(1);
            $table->text('footer_content')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('page_setups');
    }
};
