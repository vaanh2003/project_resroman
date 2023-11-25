<?php

use App\Http\Controllers\api\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\InvoicesHistoryController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderHistoryController;
use App\Http\Controllers\ProductController as ControllersProductController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserManageController;
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



Auth::routes();
Route::middleware(['auth'])->group(function () {
    Route::get('/logout', [LogoutController::class, 'logout'])->name('logout-new');

    Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

    Route::view('/products','products.showAll')->name('product.all');
    Route::view('/products2','products.showAll2')->name('product.all2');
    
    Route::get('/menu',[OrderController::class,'index']);
    
    Route::get('/product',[ControllersProductController::class,'index'])->name('product');
    Route::post('/product-add',[ControllersProductController::class,'addproduct'])->name('product-add');
    Route::get('/update-product/{id}',[ControllersProductController::class,'getOne'])->name('update-product');
    Route::post('product-update',[ControllersProductController::class,'updateProduct'])->name('product-update');
    
    Route::get('/category',[CategoryController::class,'index'])->name('category');
    Route::get('/add-category',[CategoryController::class,'addcategory'])->name('addcategory');
    Route::post('create-category',[CategoryController::class,'createCategory'])->name('create-category');
    Route::get('get-category/{id}',[CategoryController::class,'getOne'])->name('get-category');
    Route::post('update-category',[CategoryController::class,'updateCategory'])->name('update-category');

    Route::get('/sale',[SaleController::class,'index'])->name('sale');

    Route::get('/statistics',[StatisticsController::class,'index'])->name('statistics');
    
    Route::get('/add-product',[ControllersProductController::class,'showViewAdd'])->name('add-product');
    
    Route::get('/order/{id}',[MenuController::class,'showMenu'])->name('orderid');
    
    Route::get('/user',[UserController::class,'index'])->name('info-user');
    
    Route::get('employee-manager',[EmployeeController::class,'index'])->name('employee');

    Route::get('/history', [OrderHistoryController::class, 'index'])->name('history');

    Route::get('invoices-history' , [InvoicesHistoryController::class,'index'])->name('invoices-history');

    Route::get('user-manage',[UserManageController::class,'index'])->name('user-manage');
    Route::get('user-add',[UserManageController::class,'addUser'])->name('user-add');
    Route::post('user-create',[UserManageController::class,'userCreate'])->name('user-create');
});
