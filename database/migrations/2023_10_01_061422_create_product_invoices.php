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
        Schema::create('product_invoices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_product');
            $table->unsignedBigInteger('id_invoices');
            $table->integer('amount');
            $table->timestamps();

            $table->foreign('id_product')->references('id')->on('product');

            $table->foreign('id_invoices')->references('id')->on('invoices');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_invoices');
    }
};
