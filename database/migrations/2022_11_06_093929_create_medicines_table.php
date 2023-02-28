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
        Schema::create('medicines', function (Blueprint $table) {
            $table->id();
            $table->string('name');

            $table->unsignedInteger('user_id')->nullable();
            $table->unsignedInteger('medicine_type_id')->nullable();
            $table->unsignedInteger('pregnancy_category_id')->nullable();
            $table->unsignedInteger('manufacturer_id')->nullable();
            $table->unsignedInteger('generic_id')->nullable();
            $table->unsignedInteger('therapeutic_class_id')->nullable();
            $table->unsignedInteger('strength_id')->nullable();

            $table->longText('adult_dose')->nullable();
            $table->longText('child_dose')->nullable();
            $table->longText('renal_dose')->nullable();
            $table->longText('administration')->nullable();
            $table->longText('indication')->nullable();
            $table->longText('contraindication')->nullable();
            $table->longText('side_effect')->nullable();
            $table->longText('interaction')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');

            $table->json('package_prices')->nullable()->comment('Multiple item of {Price, Package}');
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
        Schema::dropIfExists('medicines');
    }
};
