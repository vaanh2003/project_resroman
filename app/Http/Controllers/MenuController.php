<?php

namespace App\Http\Controllers;

use App\Models\Category;
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
        $category =Category::where('status',1)->get();
        $data = Product::where('status', 1)
        ->get()
        ->groupBy('id_category');
        foreach ($data as $key => $value) {
            foreach ($value as $key => $product) {
                $sale = Sale::where('id_product',$product->id)->first();
                if($sale){
                    $currentDateTime = Carbon::now();
                    $dateEnd = Carbon::parse($sale->dateend);
                    $dateStart = Carbon::parse($sale->datestart);
                    if ($dateEnd->greaterThan($currentDateTime)&&$dateStart->lessThan($currentDateTime)) {
                        $product->price = $sale->price_sale;
                        $dataIfSale[] = $product;
                    }else{
                        $dataIfSale[] = $product;
                    }
                    
                }else{
                    $dataIfSale[] = $product;
                }
            }
           
        }
        return view('menu.index',['data'=>$dataIfSale,'category' => $category, 'table'=>$table]);
    }
}
