<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRoleTow
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        // Kiểm tra xem người dùng đã đăng nhập chưa và vai trò của họ là gì
        if (Auth::check() && Auth::user()->role === 3 || Auth::check() && Auth::user()->role === 2 || Auth::check() && Auth::user()->role === 1) {
            // Nếu vai trò là 1, tiếp tục xử lý yêu cầu
            return $next($request);
        }

        // Nếu không phải vai trò là 1, bạn có thể chuyển hướng hoặc trả về thông báo lỗi tùy ý
        return redirect()->route('role')->with('error', 'Không có quyền truy cập!');
    }
}
