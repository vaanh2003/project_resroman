<?php

use App\Http\Controllers\api\HistoryInvoicesController;
use App\Http\Controllers\api\HistoryOrderController;
use App\Http\Controllers\api\InvoicesController;
use App\Http\Controllers\api\ManageUserController;
use App\Http\Controllers\api\MobileController;
use App\Http\Controllers\api\OrderController;
use App\Http\Controllers\api\ProductController;
use App\Http\Controllers\api\ProductTableController;
use App\Http\Controllers\api\SaleController;
use App\Http\Controllers\api\SearchController;
use App\Http\Controllers\api\StatisticsController as ApiStatisticsController;
use App\Http\Controllers\api\TableControlle;
use App\Http\Controllers\api\TableController;
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

Route::apiResource('api-statistics',ApiStatisticsController::class);

Route::get('statistics-day',[ApiStatisticsController::class,'statisticsDay']);

Route::get('statistics-week',[ApiStatisticsController::class,'statisticsWeek']);

Route::get('statistics-month',[ApiStatisticsController::class,'statisticsMonth']);

Route::get('statistics-year',[ApiStatisticsController::class,'statisticsYear']);

Route::post('push-date',[ApiStatisticsController::class,'pushDate']);

Route::delete('product-table-delete/{id}',[ProductTableController::class,'delete']);

Route::delete('delete/{id}','App\Http\Controllers\api\ProductController@delete');

Route::delete('delete-category/{id}','App\Http\Controllers\api\CategoryController@delete');

Route::apiResource('sale',SaleController::class);

Route::post('sale-delete',[SaleController::class,'delete']);

Route::post('update-sale', [SaleController::class,'updateSale']);

Route::post('sale-one',[SaleController::class,'GetSale']);

Route::post('one-order', [HistoryOrderController::class,'oneOrder']);

Route::post('delete-product-order', [HistoryOrderController::class,'deleteProductOrder']);

Route::post('delete-order',[HistoryOrderController::class,'deleteOrder']);
Route::post('order-change-table', [HistoryOrderController::class, 'changeTable']);

Route::post('one-invoices', [HistoryInvoicesController::class,'oneInvoices']);

Route::post('delete-user', [ManageUserController::class, 'deleteUser']);

Route::post('order-mobile',[MobileController::class,'getOneCategory']);

Route::post('delete-table', [TableController::class, 'deleteTable']);

Route::post('search-product', [SearchController::class, 'searchProduct']);
Route::post('change-status', [OrderController::class,'changeStatus']);