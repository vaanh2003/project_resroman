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
        Schema::create('user', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("id_shifts");
            $table->string('name');
            $table->string('email'); // Sửa "gmail" thành "email"
            $table->string('password');
            $table->string('img');
            $table->tinyInteger('role'); // Sử dụng tinyInteger nếu muốn giới hạn giá trị số nguyên
            $table->timestamps();
            // Tạo khóa ngoại cho trường id_shifts
            $table->foreign('id_shifts')->references('id')->on('shifts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user');
    }
};
