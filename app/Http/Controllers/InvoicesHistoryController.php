<?php

namespace App\Http\Controllers;

use App\Models\Invoices;
use App\Models\Table;
use Illuminate\Http\Request;

class InvoicesHistoryController extends Controller
{
    public function index(){
        $data = Invoices::orderBy('created_at', 'desc')->get();
        foreach ($data as $key => $value) {
            $order = $value->invoices_order;
        }
        $formattedDate = [];
        foreach ($data as $key => $value) {
            $value->date = $value->created_at->format('Y-m-d H:i:s');
            $formattedDate[ ] = $value;
        }
        $table = Table::all();
        return view('invoices-history.index', ['data' => $formattedDate , 'table' => $table]);
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
        $invoices = [];
        foreach ($dataInvoices as $key => $value) {
            $data = Invoices::whereDate('created_at', '=', date('Y-m-d', strtotime($value)))->get();
            if($data->count() > 0){
                foreach ($data as $key => $pro) {
                    $order = $pro->invoices_order;
                    $invoices[] = $pro;
                }
                
            }
        }
        return view('invoices-history.index', ['data' => array_reverse($invoices) , 'table' => $table]);
    }
}
