<?php

use App\Http\Controllers\api\ProductController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProductController as ControllersProductController;
use App\Http\Controllers\StatisticsController;
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

Route::get('/product',[ControllersProductController::class,'index'])->name('product');
Route::post('/product-add',[ControllersProductController::class,'addproduct'])->name('product-add');
Route::get('/update-product/{id}',[ControllersProductController::class,'getOne'])->name('update-product');
Route::post('product-update',[ControllersProductController::class,'updateProduct'])->name('product-update');

Route::get('/statistics',[StatisticsController::class,'index'])->name('statistics');

Route::get('/add-product',[ControllersProductController::class,'showViewAdd'])->name('add-product');

Route::get('/order/{id}',[MenuController::class,'showMenu'])->name('orderid');
