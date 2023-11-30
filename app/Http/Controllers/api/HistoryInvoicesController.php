<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Invoices;
use App\Models\ProductInvoices;
use App\Models\Sale;
use App\Models\Table;
use App\Models\User;
use Illuminate\Http\Request;

class HistoryInvoicesController extends Controller
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
    public function show(Invoices $invoices)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoices $invoices)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoices $invoices)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoices $invoices)
    {
        //
    }
    public function oneInvoices(Request $request){
        $data = $request->all();
        $invoices = Invoices::find($data['idInvoices']);
        $order = $invoices->invoices_order;
        $invoices->date = $invoices->created_at->format('Y-m-d H:i:s');
        $formattedDate = $invoices;
        $user = User::find($invoices->invoices_order->id_user);
        $table = Table::find($invoices->invoices_order->id_table);
        $productInvoices = ProductInvoices::where('id_invoices', $data['idInvoices'])->get();
        return ['invoices'=>$formattedDate , 'productInvoices' => $productInvoices , 'user'=>$user , 'table'=> $table ];
    }
}
