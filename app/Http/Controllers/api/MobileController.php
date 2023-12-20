<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MobileController extends Controller
{
    public function getOneCategory(Request $request){
        $data = $request->all();
        $product = Product::where('id_category', $data['id_category'])->where('status',1)->get();
        foreach ($product as $key => $value) {
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
                }
                
            }else{
                $dataIfSale[] = $value;
            }
        }
        return $dataIfSale;
    }
}
