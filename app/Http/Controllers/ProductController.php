<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){
        $data = Product::where('status',1)->get();
        return view('product.index',['data'=>$data]);
    }
    public function showViewAdd(){
        $category = Category::all();
        return view('product.add-product',['category'=>$category]);
    }
    public function addproduct(Request $request){
        // dd($data = $request->all());
        if ($request->hasFile('file_upload')) {
            $validatedData = $request->validate([
                'file_upload' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'name' => 'required|string|max:255',
                'id_category' => 'required',
                'price' => 'required|numeric|min:0',
                'status' => 'required|in:1,2',
            ], [
                'file_upload.image' => 'Định dạng ảnh không hợp lệ.',
                'file_upload.mimes' => 'Chỉ chấp nhận các định dạng ảnh: jpeg, png, jpg hoặc gif.',
                'file_upload.max' => 'Dung lượng ảnh tối đa là 2MB.',
                'name.required' => 'Tên sản phẩm là bắt buộc.',
                'name.max' => 'Tên sản phẩm không được vượt quá 255 ký tự.',
                'id_category.required' => 'Loại sản phẩm là bắt buộc.',
                'price.required' => 'Giá sản phẩm là bắt buộc.',
                'price.numeric' => 'Giá sản phẩm phải là số.',
                'price.min' => 'Giá sản phẩm phải là số dương.',
                'status.required' => 'Tình trạng là bắt buộc.',
                'status.in' => 'Tình trạng không hợp lệ.',
            ]);
        }else{
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'id_category' => 'required',
                'price' => 'required|numeric|min:0',
                'status' => 'required|in:1,2',
            ], [
                'name.required' => 'Tên sản phẩm là bắt buộc.',
                'name.max' => 'Tên sản phẩm không được vượt quá 255 ký tự.',
                'id_category.required' => 'Loại sản phẩm là bắt buộc.',
                'price.required' => 'Giá sản phẩm là bắt buộc.',
                'price.numeric' => 'Giá sản phẩm phải là số.',
                'price.min' => 'Giá sản phẩm phải là số dương.',
                'status.required' => 'Tình trạng là bắt buộc.',
                'status.in' => 'Tình trạng không hợp lệ.',
            ]);
        }
        // $data = $request->all();
        if ($request->has('file_upload')) {
            $file = $request->file('file_upload');
            $file_name = $file->getClientOriginalName();
            $file->move(public_path('assets/img'), $file_name);
        }
        $request -> merge(['img' => $file_name]);
        Product::create($request->all());
        return redirect()->route('product');
    }
    public function getOne($id){
        $data = Product::find($id);
        $category = Category::all();
        return view('product.update-product',['data'=>$data,'category'=>$category]);
    }
    public function updateProduct(Request $request){
        if ($request->hasFile('file_upload')) {
            $validatedData = $request->validate([
                'file_upload' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'name' => 'required|string|max:255',
                'id_category' => 'required',
                'price' => 'required|numeric|min:0',
                'status' => 'required|in:1,2',
            ], [
                'file_upload.image' => 'Định dạng ảnh không hợp lệ.',
                'file_upload.mimes' => 'Chỉ chấp nhận các định dạng ảnh: jpeg, png, jpg hoặc gif.',
                'file_upload.max' => 'Dung lượng ảnh tối đa là 2MB.',
                'name.required' => 'Tên sản phẩm là bắt buộc.',
                'name.max' => 'Tên sản phẩm không được vượt quá 255 ký tự.',
                'id_category.required' => 'Loại sản phẩm là bắt buộc.',
                'price.required' => 'Giá sản phẩm là bắt buộc.',
                'price.numeric' => 'Giá sản phẩm phải là số.',
                'price.min' => 'Giá sản phẩm phải là số dương.',
                'status.required' => 'Tình trạng là bắt buộc.',
                'status.in' => 'Tình trạng không hợp lệ.',
            ]);
        }else{
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'id_category' => 'required',
                'price' => 'required|numeric|min:0',
                'status' => 'required|in:1,2',
            ], [
                'name.required' => 'Tên sản phẩm là bắt buộc.',
                'name.max' => 'Tên sản phẩm không được vượt quá 255 ký tự.',
                'id_category.required' => 'Loại sản phẩm là bắt buộc.',
                'price.required' => 'Giá sản phẩm là bắt buộc.',
                'price.numeric' => 'Giá sản phẩm phải là số.',
                'price.min' => 'Giá sản phẩm phải là số dương.',
                'status.required' => 'Tình trạng là bắt buộc.',
                'status.in' => 'Tình trạng không hợp lệ.',
            ]);
        }
        $product = Product::find($request->id);
        if ($request->has('file_upload')) {
            $file = $request->file('file_upload');
            $file_name = $file->getClientOriginalName();
            $file->move(public_path('assets/img'), $file_name);
            $request -> merge(['img' => $file_name]);
        }
        else{
            $request -> merge(['img' => $product->img]);
        }
        $product->id_category = $request->id_category;
        $product->img = $request->img;
        $product->price = $request->price;
        $product->status = $request->status;
        $product->name = $request->name;
        $product->save();
        return  redirect()->route('product');
    }
}
