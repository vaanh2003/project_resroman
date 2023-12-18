<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
    public function SearchProduct(Request $request){
        $data = $request->all();
        $dataIfSale =[];
        $searchTerm = $data['dataSearch']; // Từ khóa tìm kiếm gửi về từ người dùng

        $product = Product::where('name', 'LIKE', "%$searchTerm%")
            ->get();
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
