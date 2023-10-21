<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Table;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(){
        $data = Table::all();
        return view('order.table',['data'=>$data]);
    }
    public function showMenu($id){
        $data = Product::all();
        return view('order.menu',['data'=>$data,'id_table'=>$id]);
    }
}
