<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\ProductOrderModel;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();
        foreach ($orders as $order) {
            $table = $order->table_order;
            // $table là đối tượng Table liên quan đến từng đơn hàng
            // Bạn có thể thực hiện các thao tác với $table ở đây
        }
        return $orders;
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
        $newOrder = Order::create($data['order']);
        $newOrderId = $newOrder->id;
        foreach ($data['product_order'] as $key => $value) {
            ProductOrderModel::create([
                'id_product' => $value['id_product'],
                'id_order' => $newOrderId,
                'amount' => $value['amount'],
            ]);
        }
        return $newOrder;
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
}
