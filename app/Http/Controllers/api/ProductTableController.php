<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\ProductTable;
use Illuminate\Http\Request;

class ProductTableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public $check;
    public function index()
    {
        
        $productTables = ProductTable::all();

        $products = [];

        foreach ($productTables as $productTable) {
            $products[] = $productTable->product;
        }
        return $productTables;
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
        $check = 0 ;
        $data = $request->all();
        $product = ProductTable::where('id_product', $data['id_product'])
        ->where('id_table', $data['id_table'])
        ->first();
        if($product){
            $data['amount'] = $product->amount + 1;
            $product->update($data);
            return $product;
            $check = 1;
        }
       if($check === 0){
            return ProductTable::create($data);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductTable $productTable)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductTable $productTable)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $data = $request->all();
        if($data['button']=='destroy'){
            if($data['amount']>1){
                $data['amount'] --; 
                $product = ProductTable::find($data['id']);
                if ($product) {
                    $product->update($data);
                }
            }else{
                return true;
            }
        }else{
            $data['amount'] ++; 
            $product = ProductTable::find($data['id']);
            if ($product) {
                $product->update($data);
                return "hihi";
            }
        }
        return $product;
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductTable $productTable)
    {
        //
    }
    public function delete(ProductTable $product ,$id)
    {
        $delete = ProductTable::where('id', $id)->first();
        $delete->delete();
        return $delete;
    }
}
