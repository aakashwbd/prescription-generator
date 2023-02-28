<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('user_id')->nullable();

            $table->string('registration_no')->nullable();
            $table->string('appoint_no')->nullable();

            $table->string('name')->nullable();
            $table->string('age')->nullable();
            $table->string('gender')->nullable();
            $table->string('address')->nullable();
            $table->string('mobile')->nullable();
            $table->dateTime('date')->nullable();
            $table->float('paid')->nullable()->default(0)->comment('Amount');
            $table->integer('visit_no')->nullable()->default(1);
            $table->integer('last_visit')->nullable()->default(0);

            $table->json('medicines')->nullable()->comment('Medicines {name, dose, instruction, duration}');
            $table->json('cc')->nullable()->comment('Cubic Centimeter {name, duration, unit}');
            $table->json('ho')->nullable()->comment('History Option {types, description}');
            $table->json('oe')->nullable()->comment('On Examination {name, value, unit}');
            $table->json('dx')->nullable()->comment('Disease/Condition {name}');
            $table->json('ix')->nullable()->comment('Investigation {name}');
            $table->json('plan')->nullable()->comment('Plan {name}');
            $table->json('oh')->nullable()->comment('Oral Hygiene {name, value}');
            $table->json('mh')->nullable()->comment('Malignant Hypothermia {name, value}');

            $table->json('after_come')->nullable()->comment('After Come {Count, Type (Day, Month)}');
            $table->json('bmi')->nullable()->comment('Body Mass Index {Weight, Height (Feet + Inch), Result, Class, Ideal Weight}');
            $table->json('insulin')->nullable()->comment('Insulin {Weight, Unit/Kg, Time, Result, Dose}');
            $table->json('z_score')->nullable()->comment('Z-Score {Date of Birth, Gender, Weight, Days, Result, Ideal Weight, Weight Excess}');
            $table->json('bmr')->nullable()->comment('Basal Metabolic Rate {Weight, Height (Feet + Inch), Gender, Age, Activity, BMR, Calorie Need}');
            $table->json('edd')->nullable()->comment('Estimate Due Date {LMP, Gestational Age (LMP), EDD (LMP)}');

            $table->json('report_history')->nullable()->comment('Report History {Date, Name, Value, Unit}');

            $table->json('ot_notes')->nullable()->comment('Occupational Therapy {Name, Value}');
            $table->json('salient_features')->nullable()->comment('Salient Features {Name, Value}');
            $table->json('past_history')->nullable()->comment('Past History {Name, Value}');
            $table->json('medical_certificates')->nullable()->comment('Medical Certificates {Name, Value}');
            $table->json('others')->nullable()->comment('Others {Name, Value}');

            $table->longText('advices')->nullable()->comment('Advice');

//            $table->json('printing')->nullable()->comment('Printing {Past H/O, Present H/O, Notes, EDD}');

            $table->enum('status', ['pending', 'done'])->nullable()->default('pending');
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
        Schema::dropIfExists('prescriptions');
    }
};
