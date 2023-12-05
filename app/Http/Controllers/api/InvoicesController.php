<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Invoices;
use App\Models\Order;
use App\Models\ProductInvoices;
use App\Models\ProductOrderModel;
use App\Models\Sale;
use Illuminate\Http\Request;

class InvoicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public $array = [];
    public function index()
    {
        return Invoices::all();
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
        $data = $request->all();
        $getOrder = Order::where('id_table', $data['id_table'])
               ->where(function ($query) {
                   $query->where('status', 1)
                         ->orWhere('status', 3);
               })->first();
        if($getOrder!= null){
            $listProductOrder = ProductOrderModel::where('id_order',$getOrder->id)->get();
            foreach ($listProductOrder as $value) {
                    $product = $value->or_product;
                    $sale = Sale::where('id_product', $product->id)->first();
                    if($sale){
                        $product->price = $sale->price_sale;
                    };
                }
            $createInvoices = Invoices::create([
                'id_user' => $data['id_user'],
                'id_order' => $getOrder->id,
                'id_table' => $data['id_table'],
                'total' => $getOrder->total,
            ]);
            $order =  $createInvoices->invoices_order;
            foreach ($listProductOrder as $key => $value) {
                ProductInvoices::create([
                    'id_product' => $value['id_product'],
                    'name' => $value['or_product']['name'],
                    'price' => $value['or_product']['price'],
                    'img' => $value['or_product']['img'],
                    'id_invoices' => $createInvoices->id,
                    'amount' => $value['amount'],
                ]);
                
            }
            \Log::debug("data lay ra " . json_encode($listProductOrder));
            $getOrder->status = 2;
            $getOrder->save();
            return ['invoices'=> $createInvoices, 'productInvoices' => $listProductOrder , 'check' => 1];
        }
        else{
            return ['check' => 0];
        };
        
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoices $invoices)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoices $invoices)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoices $invoices)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoices $invoices)
    {
        //
    }
}
