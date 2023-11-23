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
        Schema::create('product_table', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_table');
            $table->unsignedBigInteger('id_product');
            $table->integer('amount');
            $table->string('name_sale');
            $table->timestamps();

            $table->foreign('id_product')->references('id')->on('product');

            $table->foreign('id_table')->references('id')->on('table');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_table');
    }
};
