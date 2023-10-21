<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::view('/products','products.showAll')->name('product.all');
Route::view('/products2','products.showAll2')->name('product.all2');

Route::get('/menu',[OrderController::class,'index']);

Route::get('/order',[OrderController::class,'index'])->name('order');
Route::get('/order/{id}',[OrderController::class,'showMenu'])->name('orderid');
