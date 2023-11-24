<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\Table;
use Illuminate\Http\Request;

class OrderHistoryController extends Controller
{
    public function index(){
        $data = Order::orderBy('created_at', 'desc')->get();
        $table = Table::all();
        return view('order-history.index', ['data' => $data , 'table' => $table]);
    }
}
