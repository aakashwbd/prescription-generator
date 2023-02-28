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
        Schema::create('prescription_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('user_id')->nullable();
            $table->float('font_size')->nullable()->default(12);
            $table->integer('line_per_page')->nullable()->default(32);
            $table->float('visit_fee')->nullable()->default(300);
            $table->float('re_visit_fee')->nullable()->default(200);
            $table->integer('re_visit_validity')->nullable()->default(90);
            $table->string('default_revisit_count')->nullable();
            $table->boolean('barcode_display')->default(1);
            $table->enum('barcode_position', ['left', 'right'])->default('left');
            $table->boolean('multiple_page_print')->default(1);
            $table->boolean('visit_no_display')->default(1);
            $table->boolean('patient_info')->default(1);
            $table->boolean('name_display')->default(1);
            $table->boolean('age_display')->default(1);
            $table->boolean('gender_display')->default(1);
            $table->boolean('weight_display')->default(1);
            $table->boolean('date_display')->default(1);
            $table->boolean('address_display')->default(1);
            $table->boolean('registration_no_display')->default(1);
            $table->boolean('mobile_display')->default(1);
            $table->boolean('cubic_centimeter_display')->default(1);
            $table->boolean('on_examination_display')->default(1);
            $table->boolean('advice_display')->default(1);
            $table->boolean('disease_display')->default(1);
            $table->boolean('footer_display')->default(1);
            $table->boolean('print_past_history')->default(0);
            $table->boolean('print_present_history')->default(0);
            $table->boolean('print_notes')->default(0);
            $table->boolean('print_edd')->default(0);
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
        Schema::dropIfExists('prescription_settings');
    }
};
