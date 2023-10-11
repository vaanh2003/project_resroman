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
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_category'); // Sử dụng unsignedBigInteger
            $table->string('name'); // Sửa "varchar" thành "string"
            $table->string('img'); // Sửa "varchar" thành "string"
            $table->integer('price');
            $table->boolean('status'); // Sử dụng boolean nếu muốn true/false
            $table->timestamps();

            $table->foreign('id_category')->references('id')->on('category');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product');
    }
};
