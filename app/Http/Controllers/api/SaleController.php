<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = 'Liên kết thành công';
        return $data;
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
        $data = $request -> all();
        $count = Sale::where('id_product', $data['id_product'])->count();
        if( $count >0){
            return 'sản phẩm này đã đưuocj thiết lập sale';
        }else{
            $sale = Sale::create($data);
            return $sale;
        }
       
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sale $sale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sale $sale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        //
    }
    public function GetSale(Request $request){
        $data = $request->all();
        $itemSale = Sale::where('id_product', $data['id_product'])->first();
        if($itemSale !== null) {
            return ['itemSale' => $itemSale, 'check' => 1];
        } else {
            return ['check' => 0];
        }
    }
    public function delete(Request $request){
        $data = $request -> all();
        $delete = Sale::where('id', $data['id'])->first();
        if($delete !== null){
            $delete->delete();
            return $delete;
        }
    }  
    public function updateSale(Request $request){
        $data = $request->all();
        $sale = Sale::find($data['id']);
        $sale->name_sale = $data['name_sale'];
        $sale->price_sale = $data['price_sale'];
        $sale->id_product = $data['id_product'];
        $sale->datestart = $data['datestart'];
        $sale->dateend = $data['dateend'];
        $sale->img = $data['img'];
        $sale->save();
        return ['check' => 1];
    } 
}
