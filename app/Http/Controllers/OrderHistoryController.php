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
        $formattedDate = [];
        foreach ($data as $key => $value) {
            $value->date = $value->created_at->format('Y-m-d H:i:s');
            $formattedDate[ ] = $value;
        }
       
        $table = Table::where('status', 1)->get();
        return view('order-history.index', ['data' => $formattedDate , 'table' => $table]);
        return $formattedDate;
    }
    public function getDate(Request $request){
        $startDate = $request->input('start-date');
        $endDate = $request->input('end-date');
    
        // Chuyển đổi ngày từ dạng string sang đối tượng Carbon (đối với Laravel)
        $start = \Carbon\Carbon::parse($startDate);
        $end = \Carbon\Carbon::parse($endDate);

        if ($end->lessThan($start)) {
            // Hiển thị thông báo lỗi
            return redirect()->back()->with('error', 'Ngày kết thúc không thể nhỏ hơn ngày bắt đầu');
        }

        $table = Table::all();
        $dataInvoices = [];

        // Thêm tất cả các ngày từ ngày bắt đầu đến ngày kết thúc vào mảng $dataInvoices
        $currentDay = $start->copy();
        while ($currentDay->lte($end)) {
            $dataInvoices[] = $currentDay->copy();
            $currentDay->addDay(); // Tăng ngày lên 1 để di chuyển đến ngày tiếp theo
        }
        $product = [];
        foreach ($dataInvoices as $key => $value) {
            $data = Order::whereDate('created_at', '=', date('Y-m-d', strtotime($value)))->get();
            if($data->count() > 0){
                foreach ($data as $key => $pro) {
                    $product[] = $pro;
                }
                
            }
        }
        // return $dataInvoices;
        return view('order-history.index', ['data' => array_reverse($product) , 'table' => $table]);
    }
}
