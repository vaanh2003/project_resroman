<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(){
        $data = Category::all();
        return view('category.index',['data'=>$data]);
    }
    public function addcategory(){
        return view('category.add-category');
    }
    public function createCategory(Request $request){
        $data = $request->all();
        Category::create([
            'name' => $data['name'],
            'status' => $data['status'],
            'soluong' => 1
        ]);
        return  redirect()->route('category');
    }
    public function getOne($id){
        $data = Category::find($id);
        return view('category.update-category',['data'=>$data]);
    }
    public function updateCategory(Request $request){
        $data = $request->all();
        $category = Category::find($data['id']);
        $category->name = $data['name'];
        $category->status = $data['status'];
        $category->save();
        return  redirect()->route('category');
    }
}
