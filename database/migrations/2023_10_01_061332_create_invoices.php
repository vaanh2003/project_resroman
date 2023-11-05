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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_table');
            $table->unsignedBigInteger('id_order');
            $table->integer('total');
            $table->timestamps();

            $table->foreign('id_user')->references('id')->on('users');

            $table->foreign('id_order')->references('id')->on('order');

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
        Schema::dropIfExists('invoices');
    }
};
