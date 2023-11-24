<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\ProductOrderModel;
use App\Models\Sale;
use App\Models\Table;
use App\Models\User;
use Illuminate\Http\Request;

class HistoryOrderController extends Controller
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
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
    public function oneOrder(Request $request){
        $data = $request->all();
        $order = Order::find($data['idOrder']);
        $user = User::find($order->id_user);
        $table = Table::find($order->id_table);
        $productOrder = ProductOrderModel::where('id_order', $data['idOrder'])->get();
        foreach ($productOrder as $key => $value) {
            $product = $value->or_product;
            $sale = Sale::where('id_product', $value->id_product)->first();
            if($sale){
                $product->price = $sale->price_sale;
            };
        }
        return ['order'=>$order , 'productOrder' => $productOrder , 'user'=>$user , 'table'=> $table ];
    }
    public function deleteProductOrder(Request $request){
        $data = $request->all();
        $productOrder = ProductOrderModel::find($data['id_order']);
        if( $productOrder !== null){
            $product = $productOrder->or_product;
            $sale = Sale::where('id_product', $productOrder->id_product)->first();
                if($sale){
                    $product->price = $sale->price_sale;
                };
            $total = $productOrder->or_product->price * $productOrder->amount;
            $order = Order::find($productOrder->id_order);
            $order->total = $order->total - $total - ($total / 100 * 8);
            $order->save();
            $productOrder->delete();
            return ['order' => $order , 'product_order' => $productOrder];
        }
       
    }
    public function deleteOrder(Request $request){
        $data = $request->all();
        $productOrder = ProductOrderModel::where('id_order',$data['idOrder'])->get();
        foreach ($productOrder as $key => $value) {
            $value->delete();
        }
        $order = Order::find($data['idOrder']);
        $order->delete();
        return ['order'=>$order];
    }
    public function changeTable(Request $request){
       $data = $request->all();
       $checkTable = Order::where('id_table', $data['idTable'])->where('status',1)->first();
       if ($checkTable) {
            return ['check' => 0];
        } else {
            $order = Order::find($data['idOrder']);
            $order->id_table = $data['idTable'];
            $order->save();
            $table = Table::find($data['idTable']);
            return ['check' => 1, 'table' =>$table];
        }
       
    }
}
