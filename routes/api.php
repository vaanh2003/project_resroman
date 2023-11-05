<?php

use App\Http\Controllers\api\InvoicesController;
use App\Http\Controllers\api\OrderController;
use App\Http\Controllers\api\ProductController;
use App\Http\Controllers\api\ProductTableController;
use App\Http\Controllers\api\TableControlle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('table',TableControlle::class);

Route::apiResource('product',ProductController::class);

Route::apiResource('invoices',InvoicesController::class);

Route::apiResource('order',OrderController::class);

Route::post('get-one-order', [OrderController::class,'getOne']);

Route::apiResource('product-table',ProductTableController::class);

Route::post('product-table-updata',[ProductTableController::class,'update']);

Route::delete('product-table-delete/{id}',[ProductTableController::class,'delete']);
Route::delete('delete/{id}','App\Http\Controllers\api\ProductController@delete');
