@extends('layouts.layout')
@push('styles')
<link rel="stylesheet" href="{{asset('assets/css/style.css')}}">
<link rel="stylesheet" href="{{asset('assets/css/statistics.css')}}">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
<script src="https://cdn.tailwindcss.com"></script>
@endpush
@section('content')
    <div class= "ml-[8%] mr-[2%] w-[90%] mb-8 justify-between">
        <div >
            <input type="datetime-local" name="date" id="inputDate">
            <button id="buttonDate" class="">Gửi</button>
        </div>
        <div class="flex justify-between mt-8 gap-5 flex-col md:flex-row">
            <h1 class="text-3xl">Thống kê</h1>
            <nav class="bg-[#F5F5F5] rounded-lg md:w-[576px]">
                <ul class="flex items-center justify-center h-full p-3">
                    <li class=" w-[124px]">
                        <input type="radio" name="filter" hidden id="filterDate" checked>
                        <label class="block w-full p-1 rounded-lg 
                        text-[#999999] text-center" for="filterDate">Ngày</label>
                    </li>
                    <li class=" w-[124px]">
                        <input type="radio" name="filter" hidden id="filterWeek">
                        <label id="clickWeek" class="block w-full p-1 rounded-lg 
                        text-[#999999] text-center" for="filterWeek">Tuần</label>
                    </li>
                    <li class=" w-[124px]">
                        <input type="radio" name="filter" hidden id="filterMonth">
                        <label class="block w-full p-1 rounded-lg 
                        text-[#999999] text-center" for="filterMonth">Tháng</label>
                    </li>
                    <li class=" w-[124px]">
                        <input type="radio" name="filter" hidden id="filterYear">
                        <label class="block w-full p-1 rounded-lg 
                        text-[#999999] text-center" for="filterYear">Năm</label>
                    </li>

                </ul>
            </nav>
        </div>
        <div class="flex justify-between mt-8 flex-wrap gap-5">
            <div class="border-[#DDDDDD] border-[1px] md:w-[calc(48%)] w-full rounded-lg">
                <h1 class="text-2xl p-8">Biểu đồ tiêu thụ các loại mặt hàng</h1>
                <div  class="w-[330px] mx-auto">
                    <canvas id="chart_product"></canvas>
                    <!-- <div id="legend-container"></div> -->
                </div>
            </div>
            <div class="border-[#DDDDDD] border-[1px] md:w-[calc(48%)] w-full p-8 rounded-lg">
                <h1 class="text-2xl pb-8">Tổng doanh thu</h1>
                <h2 id="total-invoices" class="text-center text-8xl text-[#12991F] py-8 revenue"></h2>
                <!-- <div class="flex justify-between py-8">
                    <div class="flex">
                        <img src="./img/icon_ls.svg" class="" alt="">
                        <div class="text-lg pl-4">
                            <span>Tổng lãi suất</span>
                            <br>
                            <span>5.000.000đ</span>
                        </div>
                    </div>
                    <span class="text-xl">(+10%)</span>
                </div>
                <div class="flex justify-between">
                    <div class="flex">
                        <img src="./img/icon_cp.svg" class="" alt="">
                        <div class="text-lg pl-4">
                            <span>Tổng chi phí</span>
                            <br>
                            <span>3.000.000đ</span>
                        </div>
                    </div>
                    <span class="text-xl"></span>
                </div> -->
            </div>
        </div>
        <div class="flex justify-between mt-8 flex-wrap gap-5">
            <div class="border-[#DDDDDD] border-[1px] md:w-[calc(48%)] w-full rounded-lg">
                <h1 class="text-2xl p-8">Biểu đồ doanh thu</h1>
                <div id="body-chart-user" class="">
                    <canvas id="chart_user"></canvas>
                </div>
            </div>
            <div class="border-[#DDDDDD] border-[1px] md:w-[calc(48%)] w-full p-8 rounded-lg">
                <h1 class="pb-8 text-2xl">Bán chạy nhất</h1>
                <table class="">
                    <thead>
                        <tr class="">
                            <th class="font-medium pb-8 text-xl text-[#999999] text-start">Menu</th>
                            <th class="font-medium pb-8 text-xl text-[#999999] w-full text-end">Đơn hàng</th>
                        </tr>
                    </thead>
                    <tbody id="top-product" class="special">
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>  
@endsection
@push('scripts')
    <script type="module" src="assets/js/statistics.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
@endpush