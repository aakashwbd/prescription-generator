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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('otp_verified')->default(0)->comment('0 is for False & 1 is for True');
            $table->enum('doctor_type', ['MBBS', 'BDS'])->default('MBBS')->comment('Types are MBBS & BDS');
            $table->string('institute')->nullable();
            $table->string('current_practice_area')->nullable();
            $table->enum('role', ['Admin', 'Doctor'])->default('Doctor');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
