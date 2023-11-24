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
        $table = Table::all();
        return view('invoices-history.index', ['data' => $data , 'table' => $table]);
    }
}
