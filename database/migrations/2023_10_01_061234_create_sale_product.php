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
        Schema::create('sale_product', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_product');
            $table->integer('price_sale');
            $table->datetime('start_date');
            $table->datetime('end_date');
            $table->timestamps();

            $table->foreign('id_product')->references('id')->on('product');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sale_product');
    }
};
