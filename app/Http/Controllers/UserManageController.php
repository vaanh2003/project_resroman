<?php

namespace App\Http\Controllers;

use App\Models\User;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserManageController extends Controller
{
    public function index(){
        $data = User::where('role', '!=', 0)->get();
        return view('user-manage.index',['data' => $data]);
    }public function addUser(){
        return view('user-manage.user-add');
    }
    public function userCreate(Request $request){
         // Validate the incoming request data
         $customMessages = [
            'name.required' => 'Trường tên không được bỏ trống.',
            'role.required' => 'Trường chức vụ không được bỏ trống.',
            'sdt.required' => 'Trường SĐT không được bỏ trống.',
            'sdt.numeric' => 'Trường SĐT phải là số.',
            'sdt.digits' => 'Trường SĐT phải đủ 10 số.',
            'email.required' => 'Trường email không được bỏ trống.',
            'email.email' => 'Email không hợp lệ.',
            'email.unique' => 'Email đã được sử dụng.',
            'password.required' => 'Trường mật khẩu không được bỏ trống.',
            'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự.',
            'password.confirmed' => 'Mật khẩu xác nhận không khớp.'
        ];
        
        $validatedData = $request->validate([
            'name' => 'required',
            'role' => 'required',
            'sdt' => 'required|digits:10|numeric',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed',
        ], $customMessages);

       $data = $request->all();
       User::create([
            'name' => $data['name'],
            'role' => $data['role'],
            'sdt' => $data['sdt'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
       ]);
       return redirect()->route('user-manage');
    }
}
