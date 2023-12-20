<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\ProductOrderModel;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::where('status', 1)
        ->orWhere('status', 3)
        ->get();
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
       $check = Order::where('id_table', $data['order']['id_table'])
               ->where(function ($query) {
                   $query->where('status', 1)
                         ->orWhere('status', 3);
               })
               ->get();
        if($check->isEmpty()){
            $newOrder = Order::create($data['order']);
            $newOrderId = $newOrder->id;
            foreach ($data['product_order'] as $key => $value) {
                ProductOrderModel::create([
                    'id_product' => $value['id_product'],
                    'status' => 2,
                    'id_order' => $newOrderId,
                    'amount' => $value['amount'],
                ]);
            }
           
           
        }
        else{
            $check['0']['total'] += $data['order']['total'];
            $check['0']['status'] = 3; 
            $check['0']->save();
            foreach ($data['product_order'] as $key => $value) {
                ProductOrderModel::create([
                    'id_product' => $value['id_product'],
                    'status' => 2,
                    'id_order' => $check['0']['id'],
                    'amount' => $value['amount'],
                ]);
            }
        }  
        \Log::debug("data truy vấn  {$request}");
        \Log::debug("order {$check}");
        return $data;
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
    public function getOne(Request $request){
        $data = $request->all();
        $order = Order::where('id_table', $data['id_table'])
        ->where(function ($query) {
            $query->where('status', 1)
                  ->orWhere('status', 3);
        })
        ->first();
        if ($order !== null) {
            // Đã lấy được giá trị của $order
            $table = $order->table_order;
            $user = $order->user_order;
            
            // Tiếp tục lấy sản phẩm liên quan
            $products = ProductOrderModel::where('id_order', $order->id)->get();
            $productIfSale = [];
            $currentDate = Carbon::now();
            foreach ($products as $product) {
                $productOrder = $product->or_product;
                $sale = Sale::where('id_product', $productOrder->id)
                ->where('dateend', '>', $currentDate)
                ->first();
                if($sale){
                    $productOrder->price = $sale->price_sale;
                };
            }
            \Log::debug("data{$products}");
            return ["order" => $order, "product" => $products];
        } else {
            // Không tìm thấy đơn đặt hàng
            return ["error" => "Không tìm thấy đơn đặt hàng"];
        }
    }
    public function changeStatus(Request $request){
        $data = $request->all();
        $order = Order::where('id_table', $data['id_table'])
        ->where(function ($query) {
            $query->where('status', 1)
                  ->orWhere('status', 3);
        })
        ->first();
        if ($order !== null) {
            $products = ProductOrderModel::where('id_order', $order->id)->get();
            foreach ($products as $key => $value) {
                $value->status = 0;
                $value->save();
            }
        }
        $order->status = 1;
        $order->save();
    }
    
}
