@extends('layouts.layout')
@push('styles')
    <link rel="stylesheet" href="assets/css/slick.min.css">
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/history.css">
    <link rel="stylesheet" href="assets/css/history-mobile.css">
@endpush
@section('content')
    <div class="col-12 col-lg-5 pl-3 pl-lg-0 d-none d-lg-block">
        <div class="item-title-history">
            <h3 class="">Lịch sử đơn hàng</h3>
            <a href="{{route('invoices-history')}}"><p>Lịch sử hóa đơn</p></a>
        </div>  
        <div class="card">
            @if(session('error'))
            <div class="alert alert-danger">
                {{ session('error') }}
            </div>
        @endif
            <div class="history-order-tital card-header bg-none py-4">
                <h4>Tất cả đơn hàng</h4>
                <div class="button-function-order">
                    <button id="button-date-range">Chọn ngày <i class="fa-solid fa-calendar-days"></i></button>
                    <div id="date-range" class="date-range-none">
                        <form action="{{route('history-date')}}" method="post">
                            @csrf
                            <label for="start-date">Ngày bắt đầu:</label>
                            <input type="datetime-local" name="start-date" id="start-date" required><br>
                            
                            <label for="end-date">Ngày kết thúc:</label>
                            <input type="datetime-local" name="end-date" id="end-date" required>
                            
                            <button class="button-submit-date-range" type="submit" required>Gửi</button>
                        </form>
                    </div>
                </div>
                
            </div>
            <div class="card-body p-4">
                <div class="list-group overflow-auto order">
                    <div class="row m-0">
                        @foreach ($data as $item)
                            <div id="order-{{$item->id}}" class="item-order col-12 p-0 mb-3 mt-1">
                                <input id="id_order" type="hidden" name="id_order" value="{{$item->id}}">
                                <div class="card card-qr">
                                    <a href="#">
                                        <div class="card-body">
                                            <div class="row py-1">
                                                <div class="col-7">
                                                    <div class="h5 font-weight-bolder">
                                                        Đơn hàng #{{$item->random_number}}
                                                    </div>
                                                    <div class="pt-3">
                                                        @php
                                                            $datetime = $item->created_at;
                                                            $timestamp = strtotime($datetime);
                                                            $time = date('H:i', $timestamp);
                                                        @endphp
                                                        <span class="text-muted h6 mr-5">{{$time}}</span>
                                                        <span class="text-muted h6">{{$item->name}}</span>
                                                    </div>
                                                </div>
                                                <div class="col-5 text-right">
                                                   @if ($item->status == 1 || $item->status == 3)
                                                        <div class="text-main h6">
                                                            Chưa thanh toán
                                                        </div>
                                                    @else
                                                        <div class="text-green h6">
                                                            Đã thanh toán
                                                        </div>                                                   
                                                    @endif
                                                    <div id="total-order" class="h5 font-weight-bolder pt-3">{{$formattedPrice = number_format($item->total, 0, ',', ',')}}đ</div>
                                                </div>
                                            </div>
                                            @if ($item->status == 1 || $item->status == 3)
                                                <div class="body-button">
                                                    <div class="item-button">
                                                        <input id="id_order" type="hidden" name="id_order" value="{{$item->id}}">
                                                        <button class="button" id="delete-order">Xóa</button>
                                                    </div>
                                                    <div class="item-button">
                                                        <input id="id_order" type="hidden" name="id_order" value="{{$item->id}}">
                                                        <select name="table" id="table" >
                                                            <option value="">Chọn</option>
                                                            @foreach ($table as $tab)
                                                                <option value="{{$tab->id}}">{{$tab->name}}</option>
                                                            @endforeach
                                                        </select>
                                                        <button class="button"  id="change-table">Đổi bàng</button>
                                                    </div>
                                                </div>
                                            @endif
                                        </div>
                                    </a>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 col-lg-6 p-3">
        <div class="d-block d-lg-none">
            <a href="order.html" class="btn btn-main px-2">
                <img src="assets/img/back.svg" width="15"> Quay lại
            </a>
        </div>
        <div class="row pt-3">
            <div class="col-12 mx-auto px-4 px-lg-5 pt-2">
                <div class="modal-header px-0 d-block">
                    <h5 class="modal-title">
                        <div class="d-flex">
                            <h3 id="show-id" class="font-weight-bolder">Đơn hàng #20231</h3>
                            <h5 id="show-status" class="font-weight-bolder text-main ml-auto">Đã thanh toán</h5>
                        </div>
                    </h5>
                </div>
                <div class="modal-body px-0">
                    <div class="row">
                        <div class="col-12">
                            <div id="show-date" class="h5 font-weight-bolder mb-4">Chi tiết</div>
                            <div class="row p-lg-0 text-center font-weight-bolder">
                                <div class="col-4 px-lg-0 text-muted h7">Số bàn</div>
                                <div class="col-4 px-lg-0 text-muted h7">Người thanh toán</div>
                                <div class="col-4 px-lg-0 text-muted h7">Thanh toán</div>
                            </div>
                            <div class="row p-0 mt-2 text-center font-weight-bolder">
                                <div id="show-name" class="col-4 px-lg-0 h7"></div>
                                <div id="show-user" class="col-4 px-lg-0 h7"></div>
                                <div  class="col-4 px-lg-0 h7"></div>
                            </div>
                        </div>
                        <div class="col-12 mt-5">
                            <div class="h5 font-weight-bolder mb-3">Đơn hàng</div>
                            <div id="show-product-order" class="list-group overflow-auto order-detail">
                                {{-- <div class="card mb-3">
                                    <div class="d-flex justify-content-between p-2">
                                        <img src="assets/img/pexels-rajesh-tp-1633572-1.png" class="img-order">
                                        <div class="align-self-center mr-auto px-4 font-weight-bolder h7">
                                            Nui xào bò <span class="ml-2 h7">x2</span>
                                        </div>
                                        <div class="text-main align-self-center font-weight-bolder h7 px-4">
                                            60.000đ
                                        </div>
                                    </div>
                                </div>
                                <div class="card mb-3">
                                    <div class="d-flex justify-content-between p-2">
                                        <img src="assets/img/pexels-rajesh-tp-1633572-1.png" class="img-order">
                                        <div class="align-self-center mr-auto px-4 font-weight-bolder h7">
                                            Nui xào bò <span class="ml-2 h7">x2</span>
                                        </div>
                                        <div class="text-main align-self-center font-weight-bolder h7 px-4">
                                            60.000đ
                                        </div>
                                    </div>
                                </div>
                                <div class="card mb-3">
                                    <div class="d-flex justify-content-between p-2">
                                        <img src="assets/img/pexels-rajesh-tp-1633572-1.png" class="img-order">
                                        <div class="align-self-center mr-auto px-4 font-weight-bolder h7">
                                            Nui xào bò <span class="ml-2 h7">x2</span>
                                        </div>
                                        <div class="text-main align-self-center font-weight-bolder h7 px-4">
                                            60.000đ
                                        </div>
                                    </div>
                                </div>
                                <div id="product-1" class="card mb-3">
                                    <div class="d-flex justify-content-between p-2">
                                        <img src="assets/img/pexels-rajesh-tp-1633572-1.png" class="img-order">
                                        <div class="align-self-center mr-auto px-4 font-weight-bolder h7">
                                            Nui xào bò <span class="ml-2 h7">x2</span>
                                        </div>
                                        <div class="text-main align-self-center font-weight-bolder h7 px-4">
                                            60.000đ
                                        </div>
                                    </div>
                                </div> --}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="notification-delete-product" class="notification-delete-product-none">
        <div class="item-notification-delete-product">
            <div id="back-notification" class="back-body-notification-delete">

            </div>
            <div class="body-notification-delete">
                <div class="body-notification-delete-img">
                    <img src="assets/img/alert-1.svg" alt="">
                </div>
                <div class="body-notification-delete-content">
                    <span>Bạn muốn xóa sản phẩm này ?</span>
                </div>
                <div class="body-notification-delete-buntton">
                    <input id="post-id-order" type="hidden" name="post-id-order" value="">
                    <button id="button-yes" class="button-yes">Có</button>
                    <button id="button-no" class="button-no">Không</button>
                </div>
            </div>
        </div>
   </div>

   {{-- Thông báo xóa Order --}}
   <div id="notification-delete-order" class="notification-delete-product-none">
        <div class="item-notification-delete-product">
            <div id="back-notification-order" class="back-body-notification-delete">

            </div>
            <div class="body-notification-delete">
                <div class="body-notification-delete-img">
                    <img src="assets/img/alert-1.svg" alt="">
                </div>
                <div class="body-notification-delete-content">
                    <span>Bạn muốn xóa order này ?</span>
                </div>
                <div class="body-notification-delete-buntton">
                    <input id="post-order-id" type="hidden" name="post-id-order" value="">
                    <button id="button-yes-order" class="button-yes">Có</button>
                    <button id="button-no-order" class="button-no">Không</button>
                </div>
            </div>
        </div>
    </div>

    {{-- Thông báo change-table --}}
    <div id="notification-change-table" class="notification-delete-product-none">
        <div class="item-notification-delete-product">
            <div id="back-notification-change-table" class="back-body-notification-delete">

            </div>
            <div class="body-notification-delete">
                <div class="body-notification-delete-img">
                    <img src="assets/img/alert-1.svg" alt="">
                </div>
                <div class="body-notification-delete-content">
                    <span>Bạn chắc bạn muốn đổi bàn ?</span>
                </div>
                <div class="body-notification-delete-buntton">
                    <input id="post-table-change" type="hidden" name="post-table-change" value="">
                    <input id="post-order-change" type="hidden" name="post-id-order" value="">
                    <button id="button-yes-change" class="button-yes">Có</button>
                    <button id="button-no-change" class="button-no">Không</button>
                </div>
            </div>
        </div>
    </div>

    
@endsection
@push('scripts')
<script src="assets/js/history.js"></script>
<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/style.js"></script>
@endpush