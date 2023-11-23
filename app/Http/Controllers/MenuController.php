<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use App\Models\Table;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function showMenu($id){
        $dataIfSale =[];
        $table = Table::where('id',$id)->first();
        $data = Product::all();
        foreach ($data as $key => $value) {
            $sale = Sale::where('id_product',$value->id)->first();
            if($sale){
                $currentDateTime = Carbon::now();
                $dateEnd = Carbon::parse($sale->dateend);
                $dateStart = Carbon::parse($sale->datestart);
                if ($dateEnd->greaterThan($currentDateTime)&&$dateStart->lessThan($currentDateTime)) {
                    $value->price = $sale->price_sale;
                    $dataIfSale[] = $value;
                }else{
                    $dataIfSale[] = $value;
                    \Log::debug("Các sản phẩm chạy qua if như không ngày{$value}");
                }
                
            }else{
                $dataIfSale[] = $value;
            }
        }
        return view('menu.index',['data'=>$dataIfSale,'table'=>$table]);
    }
}
