<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(){
        return view('user.index');
    }
    public function changePassword(Request $request){
        $data = $request->all();
        $user = User::find($data['id']);
        if($data['new-password'] != $data['check-password'] ){
            Session::flash('error', 'Mật khẩu nhập lại không khớp');
            return redirect()->back();
        }else{
            if ($user) {
                // Kiểm tra mật khẩu
                if (Auth::validate(['email' => $user->email, 'password' => $data['password']])) {
                    $user->password = bcrypt($data['new-password']);
                    $user->save();
            
                    // Hiển thị thông báo thành công
                    Session::flash('success', 'Mật khẩu đã được thay đổi');
                    return redirect()->back();
                } else {
                    Session::flash('error', 'Mật khẩu không đúng');
                    return redirect()->back();
                }
            } else {
                // Không tìm thấy người dùng với id=$userId
            }
            return $user ;
        }
        
    }
    public function changeInfo(Request $request){
        $data = $request->all();
        if(is_numeric($data['sdt']) && strlen($data['sdt']) === 10){
            $user = User::find($data['id']);
            $user->name = $data['name'];
            $user->sdt = $data['sdt'];
            $user->save();
            Session::flash('success', 'Thay đổi thông tin thành công');
            return redirect()->back();
        }else{
            Session::flash('error', 'Nhập số điện thoại sai');
            return redirect()->back();
        }
        
    }
}
