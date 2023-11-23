<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function index(){
        $dataSale = [];
        $dataProduct = [];
        $data = Product::all();
        foreach ($data as $key => $product) {
            $check = Sale::where('id_product', $product['id'])->first();
            if($check !== null) {
                $dataProduct[] = ['product'=>$product , 'check' => 1];
            } else {
                $dataProduct[] = ['product'=>$product , 'check' => 0];
            }
        }
        $sale = Sale::all();
        foreach ($sale as $key => $value) {
            $price = Product::find($value->id_product);
            $dataSale[] = ['price'=>$price->price, 'product_sale'=>$value];
        }
        return view('sale.index',['data'=>$dataProduct,'data_sale' => $dataSale]);
    }
}
