<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Table;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function showMenu($id){
        $table = Table::where('id',$id)->first();
        $data = Product::all();
        return view('menu.index',['data'=>$data,'table'=>$table]);
    }
}
