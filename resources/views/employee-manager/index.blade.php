@extends('layouts.layout')
@push('styles')
<script src="https://cdn.tailwindcss.com"></script>
@endpush
@section('content')
<div class="ml-[8%] mr-[2%] w-[90%] mb-8 justify-between">
    <div class="flex justify-between mt-8 gap-5 flex-col md:flex-row">
        <div class="relative">
            <div class="sm:mb-0 mb-8 flex justify-between">
                <h1 class="sm:text-3xl text-xl">Danh sách nhân viên</h1>
                <div id="menu" class="sm:hidden pe-2">
                    <i class="fa-solid fa-bars"></i>
                    </div>
                    <div id="cancel" class="hidden pe-2">
                    <i class="fa-solid fa-x"></i>
                </div>
            </div>
        
        <ul
        id="menu-content"
        class="flex flex-col items-left gap-5 absolute z-10 w-full h-screen right-0 bg-white hidden"
        >
        <li class="">
          <a href="#" class="flex gap-2 items-center">
            <i
              class="fa-solid fa-house text-2xl w-[10%] text-[#BBBBBB]"
            ></i>
            <p>Trang chủ</p>
          </a>
        </li>
        <li>
          <a href="#" class="flex gap-2 items-center">
            <i
              class="fa-solid fa-clipboard text-2xl w-[10%] text-[#BBBBBB]"
            ></i>
            <p>Đặt bàn</p>
          </a>
        </li>
        <li>
          <a href="#" class="flex gap-2 items-center">
            <i
              class="fa-solid fa-utensils text-2xl w-[10%] text-[#BBBBBB]"
            ></i>
            <p>Loại sản phẩm</p>
          </a>
        </li>
        <li>
          <a href="#" class="flex gap-2 items-center">
            <i
              class="fa-solid fa-burger text-2xl w-[10%] text-[#BBBBBB]"
            ></i>
            <p>Sản phẩm</p>
          </a>
        </li>
        <li>
          <a href="#" class="flex gap-2 items-center">
            <i class="fa-solid fa-bell text-2xl w-[10%] text-[#BBBBBB]"></i>
            <p>Thông báo</p>
          </a>
        </li>
        <li>
          <a href="#" class="flex gap-2 items-center">
            <i
              class="fa-solid fa-database text-2xl w-[10%] text-[#BBBBBB]"
            ></i>
            <p>Thống kê</p>
          </a>
        </li>
        <li>
          <a href="#" class="flex gap-2 items-center">
            <i class="fa-solid fa-user text-2xl w-[10%] text-[#F67F20]"></i>
            <p class="text-[#F67F20]">Danh sách nhân viên</p>
          </a>
        </li>
        <li>
          <a href="#" class="flex gap-2 items-center">
            <i class="fa-solid fa-gear text-2xl w-[10%] text-[#BBBBBB]"></i>
            <p>Cài đặt</p>
          </a>
        </li>
      </ul>
    </div>
      <div>
        <button class="sm:w-44 w-28 p-3 bg-[#F67F20] text-white rounded-lg sm:text-base text-xs">
            <a href="./html/update.html">Thêm người</a>
        </button>
    </div>
    </div>
    <div class="flex justify-between mt-8 flex-wrap gap-5">
        <table class="border-collapse border border-solid border-[#DDDDDD] w-full text-center">
            <thead>
                <tr class="border border-solid border-[#DDDDDD]">
                    <th class="sm:p-8 p-2 border border-solid border-[#DDDDDD] text-[#999999] 
                    ">
                        <p class="sm:text-base text-xs">Họ tên</p>
                    </th>
                    <th class="sm:p-8 p-2 border border-solid border-[#DDDDDD] text-[#999999]
                    ">
                        <p class="sm:text-base text-xs">Ca</p>
                    </th>
                    <th class="sm:p-8 p-2 border border-solid border-[#DDDDDD] text-[#999999]
                    ">
                        <p class="sm:text-base text-xs">Lương</p>
                    </th>
                    <th class="sm:p-8 p-2 border border-solid border-[#DDDDDD] text-[#999999]
                    ">
                        <p class="sm:text-base text-xs">Giới tính</p>
                    </th>
                    <th class="sm:p-8 p-2 border border-solid border-[#DDDDDD] text-[#999999]
                    ">
                        <p class="sm:text-base text-xs">Chức vụ</p>
                    </th>
                    <th class="sm:p-8 p-2 border border-solid border-[#DDDDDD] text-[#999999]
                    ">
                        <p class="sm:text-base text-xs">Thao tác</p>
                    </th>
                </tr>
            </thead>
            <tbody class="user">
                <tr class="border border-solid border-[#DDDDDD]">
                    <td class="border border-solid border-[#DDDDDD]">
                        <div class="flex justify-center items-center">
                            <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                                class="w-16 sm:inline hidden" alt="">
                            <p class="sm:text-base text-xs">Nguyễn Vũ Lân</p>
                        </div>
                    </td>
                    <td class="border border-solid border-[#DDDDDD]">
                        <p class="sm:text-base text-xs">1</p>
                    </td>
                    <td class="border border-solid border-[#DDDDDD] text-[#F67F20]">
                        <p class="sm:text-base text-xs">100.000.000</p>
                    </td>
                    <td class="border border-solid border-[#DDDDDD]">
                        <p class="sm:text-base text-xs">Nam</p>
                    </td>
                    <td class="border border-solid border-[#DDDDDD]">
                        <p class="sm:text-base text-xs">Quản lý</p>
                    </td>
                    <td class="">
                        <div class="flex justify-around items-center cursor-pointer">
                            <div class="text-[#12991F]" onclick="goToEditPage('edit')">
                                <i class="fa-solid fa-pencil"></i>
                                <span class="sm:inline hidden">Sửa</span>
                            </div>
                            <div class="text-[#F67F20]" onclick="toggleConfirmDeleteModal()">
                                <i class="fa-solid fa-trash"></i>
                                <span class="sm:inline hidden">Xóa</span>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
@endsection
@push('scripts')
    <script type="module" src="assets/js/statistics.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
@endpush