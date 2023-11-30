<?php

namespace App\Http\Controllers;

use App\Models\AreaModel;
use App\Models\Table;
use Illuminate\Http\Request;

class TableController extends Controller
{
    public function index(){
        $data = Table::where('status',1)->get();
        foreach ($data as $key => $value) {
            $area = $value->table_area;
        }
        return view('table.index', ['data' => $data]);
        // return $data;
    }
    public function addTable(){
        $data = AreaModel::where('status',1)->get();
        return view('table.addTable',['data' => $data]);
    }
    public function createTable(Request $request){
        $data = $request->all();
        Table::create($data);
        return redirect()->route('table');
    }
    public function updateTable($id){
        $data = Table::find($id);
        $area = AreaModel::where('status', 1)->get();
        return view('table.updateTable', ['data' => $area, 'table' => $data]);
    }
    public function updateNewTable(Request $request){
        $data = $request->all();
        $table = Table::find($data['id']);
        $table->name = $data['name'];
        $table->id_area = $data['id_area'];
        $table->save();
        return redirect()->route('table');

    }
}
