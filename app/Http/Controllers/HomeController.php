<?php

namespace App\Http\Controllers;

use App\Models\Table;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $data = Table::where('status',1)->get();
        foreach ($data as $table) {
            $tableOrders = $table->table_order; // Sử dụng 'tableOrders' thay vì 'table_order'
            // Xử lý dữ liệu ở đây nếu cần
        }
        return view('home.index',['data'=>$data]);
    }
}
