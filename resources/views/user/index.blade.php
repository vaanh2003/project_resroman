@extends('layouts.layout')
@push('styles')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdn.tailwindcss.com"></script>
@endpush
@section('content')
<div class="ml-[8%] mr-[2%] w-[90%] my-8">
    <div class="sm:flex justify-between">
      <div
        class="border-[#DDDDDD] border-[1px] md:w-[calc(50%-30px)] w-full p-8 rounded-lg"
      >
        <div class="border-[#DDDDDD] border-b-[1px]">
          <div class="flex justify-center relative mx-auto w-fit">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              class="rounded-full w-[157px]"
              alt=""
            />
            <div
              class="rounded-full bg-[#F67F20] text-white w-10 h-10 flex justify-center items-center absolute right-0 top-[26px] right-[26px] border-[5px] border-white translate-x-1/2 -translate-y-1/2 cursor-pointer"
              onclick="toggleConfirmDeleteModal()"
            >
              <i class="fa-solid fa-pencil"></i>
            </div>
          </div>
          <div class="text-center pt-4 pb-8">
            <h1 class="text-xl">{{Auth::user()->name}}</h1>
            <p class="text-[#999999]">Quản lý</p>
          </div>
        </div>
        <div class="tab">
          <div>
            <button
              type="button"
              class="flex justify-between w-full p-4 my-8 rounded-lg text-start border-[#DDDDDD] border-[1px] tablinks active"
              onclick="openTabContent(event, 'infomation')"
              name="button"
              checked
            >
              <p class="">Thông tin cá nhân</p>
              <div class="">
                <i class="fa-solid fa-angle-right fa-lg"></i>
              </div>
            </button>
          </div>
          <div>
            <button
              type="button"
              class="flex justify-between w-full p-4 my-8 rounded-lg text-start border-[#DDDDDD] border-[1px] tablinks"
              onclick="openTabContent(event, 'password')"
              name="button"
            >
              <p class="">Đăng nhập & Mật khẩu</p>
              <div class="">
                <i class="fa-solid fa-angle-right fa-lg"></i>
              </div>
            </button>
          </div>
        </div>
        <div class="pl-4 text-[#F67F20]">
          <a href="{{ route('logout') }}"
          
            onclick="event.preventDefault();
                    document.getElementById('logout-form').submit();">
          <p>Đăng xuất</p>
          
          </a>
          <form id="logout-form" action="{{ route('logout-new') }}" method="POST" class="d-none">
            @csrf
        </form>
        </div>
      </div>
      <div class="md:w-[calc(50%-30px)] w-full">
        <div id="infomation" class="tabcontent">
          <div class="pb-12">
            <h1 class="text-3xl pb-4 ps-2 mt-8 sm:mt-0">
              Thông tin cá nhân
            </h1>
            <p class="text-base text-[#999999] font-medium ps-2">
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s.
            </p>
          </div>
          <div class="">
            <form class="grid xl:grid-cols-2 gap-12" action="">
              <div class="m-auto">
                <div class="">
                  <label for="">Họ và tên</label> <br />
                  <input
                    type="text"
                    id=""
                    class="info border border-solid border-[#DDDDDD] rounded-lg w-[300px] h-[60px] mt-2 p-2 focus-visible:outline-black"
                    value="{{Auth::user()->name}}"
                  />
                </div>
              </div>
              <div class="m-auto">
                <div class="">
                  <label for="">Số điện thoại</label> <br />
                  <input
                    type="text"
                    id=""
                    class="phone border border-solid border-[#DDDDDD] rounded-lg w-[300px] h-[60px] mt-2 p-2 focus-visible:outline-black"
                    value="{{Auth::user()->sdt}}"
                  />
                </div>
              </div>
              <div class="m-auto">
                <div class="">
                  <label for="">Ngày sinh</label> <br />
                  <input
                    type="text"
                    id=""
                    class="birthday border border-solid border-[#DDDDDD] rounded-lg w-[300px] h-[60px] mt-2 p-2 focus-visible:outline-black"
                  />
                </div>
              </div>
              <div class="m-auto">
                <div class="">
                  <label for="">Chức vụ</label> <br />
                  <input
                    type="text"
                    id=""
                    class="role border border-solid border-[#DDDDDD] rounded-lg w-[300px] h-[60px] mt-2 p-2 focus-visible:outline-black"
                    readonly
                    value="{{Auth::user()->role}}"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="text-center">
            <button type="submit"
              class="p-3 bg-[#F67F20] rounded-lg text-white w-full h-[60px] mt-[90px]"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
        <div id="password" class="tabcontent hidden">
          <div class="pb-12">
            <h1 class="text-3xl pb-4 ps-2 mt-8 sm:mt-0">
              Đăng nhập & Mật khẩu
            </h1>
            <p class="text-base text-[#999999] font-medium ps-2">
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s.
            </p>
          </div>
          <div class="">
            <form class="grid xl:grid-cols-2 gap-12" action="">
              <div class="m-auto">
                <div class="">
                  <label for="">Email</label> <br />
                  <input
                    type="text"
                    id=""
                    class="gmail border border-solid border-[#DDDDDD] rounded-lg w-[300px] h-[60px] mt-2 p-2 focus-visible:outline-black"
                  />
                </div>
              </div>
              <div class="m-auto">
                <div class="">
                  <label for="">Mật khẩu</label> <br />
                  <input
                    type="text"
                    id=""
                    class="password border border-solid border-[#DDDDDD] rounded-lg w-[300px] h-[60px] mt-2 p-2 focus-visible:outline-black"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="text-center">
            <button
              class="p-3 bg-[#F67F20] rounded-lg text-white w-full h-[60px] mt-[230px]"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
      class="z-10 hidden absolute inset-0"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      id="confirmDeleteModal"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onclick="toggleConfirmDeleteModal()"
      ></div>
      <div
        class="absolute transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2"
      >
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="flex flex-col items-center">
            <div class="flex justify-evenly my-8 w-full font-semibold">
              <div>
                <img
                  src="./img/camera-solid.svg"
                  class="p-14 bg-[#E5E5E5] rounded-lg w-36"
                  onclick="toggleConfirmDeleteModal()"
                  alt=""
                />
                <h1 class="text-center text-2xl mt-2">Chụp ảnh</h1>
              </div>
              <div>
                <img
                  src="./img/image-solid.svg"
                  class="p-14 bg-[#E5E5E5] rounded-lg w-36"
                  onclick="toggleConfirmDeleteModal()"
                  alt=""
                />
                <h1 class="text-center text-2xl mt-2">Chọn ảnh</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
@endsection
@push('scripts')
    <script src="assets/js/user.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
@endpush