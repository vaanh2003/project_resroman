<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Table;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MobileController extends Controller
{
    public function index($id){
        $table = Table::find($id);
        $productCategory = [];
        $dataCategory = [];
        $dataIfSale =[];
        $productSale =[];
        $data = Product::all();
        foreach ($data as $key => $value) {
            $sale = Sale::where('id_product',$value->id)->first();
            if($sale){
                $currentDateTime = Carbon::now();
                $dateEnd = Carbon::parse($sale->dateend);
                $dateStart = Carbon::parse($sale->datestart);
                if ($dateEnd->greaterThan($currentDateTime)&&$dateStart->lessThan($currentDateTime)) {
                    $value->price = $sale->price_sale;
                    $productSale[] = $value;
                }
            }
        }
        $category = Category::all();
        foreach ($category as $key => $cate) {
            $product = Product::where('id_category', $cate->id)->get();
            $productCategory = [];
            foreach ($product as $key => $pro) {
                $sale = Sale::where('id_product',$pro->id)->first();
                if($sale){
                    $currentDateTime = Carbon::now();
                    $dateEnd = Carbon::parse($sale->dateend);
                    $dateStart = Carbon::parse($sale->datestart);
                    if ($dateEnd->greaterThan($currentDateTime)&&$dateStart->lessThan($currentDateTime)) {
                        $pro->price = $sale->price_sale;
                        $productCategory[] = $pro;
                    }else{
                        $productCategory[] = $pro;
                    }
                    
                }else{
                    $productCategory[] = $pro;
                }

            }
            $dataCategory[] = ['category' => $cate, 'productCategory' => $productCategory];
        }
        return view('web-mobile.index',['data'=>$dataCategory, 'productSale' =>  $productSale , 'table' => $table]);

    }
}
