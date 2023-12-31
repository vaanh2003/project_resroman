@extends('layouts.layout')
@push('styles')
    <link rel="stylesheet" href="{{asset('assets/css/menu.css')}}">
    <link rel="stylesheet" href="{{asset('assets/css/style.css')}}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
@endpush
@section('content')
    <input id="table" type="hidden" name="table" value="{{$table->id}}">
    <input id="id_user" type="hidden" name="id_user" value="{{Auth::user()->id}}">
    <div class="body-item-mmenu col-8 pl-0">
        <div class="row pt-3">
            <div class="col-2">
                <a href={{route('home')}}>
                    <p class="logo"><span class="span">Resto</span><span class="text">Man</span></p>
                </a>
            </div>
            <div class="col-7 mr-3">
                <div id="body-search" class="input-group mb-4 border rounded-pill p-1">
                    <input type="search" id="search" placeholder="Tìm kiếm?" class="form-control bg-none border-0">
                    <div class="input-group-append border-0">
                        <button id="button-search" type="button" class="btn btn-link"><img src="{{asset('assets/img/union.svg')}}"></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row p-3">
            <div class=" item-category col-3 p-0">
                <div class="bg-main rounded-br p-2 mx-3 text-light text-center">
                    <a href="{{ route('orderid', ['id' => $table->id]) }}" class="text-white" id="reloadLink">Tất cả</a>
                </div>
            </div>
            @foreach ($category as $cate)
                <div class="col-3 item-category p-0">
                    <div id="category" class="bg-main rounded-br p-2 mx-3 text-light text-center">
                        <input type="hidden" id="id_category" name="id_category" value="{{$cate->id}}">
                        <a href="#" class="text-white">{{$cate->name}}</a>
                    </div>
                </div>
            @endforeach
        </div>
        <div class="list-group overflow-auto product">
            <div id="body-show-product" class="row m-0">
                @foreach ($data as $item)
                    <div class="col-4 mb-3">
                        <div class="card">
                            <div class="body-img-product-menu">
                                <img class="" src="{{asset('assets/img/'.$item->img)}}">
                            </div>
                            <div class="card-body">
                                <div class=" justify-content-between">
                                    <h5 class="card-title">{{$item->name}}</h5>
                                    <h5 class="text-main">{{$formattedPrice = number_format($item->price, 0, ',', ',')}}đ</h5>
                                </div>
                                <p class="card-text">Đây là món ăn ngon nhất thế giới</p>
                                <div class="d-flex justify-content-center">
                                    <div class="form-add">
                                        <input type="hidden" id="id_product" name="id_product" value="{{$item->id}}">
                                        <input type="hidden" id="name" name="name" value="{{$item->name}}">
                                        <input type="hidden" id="id_category" name="id_category" value="{{$item->id_category}}">
                                        <input type="hidden" id="img" name="img" value="{{$item->img}}">
                                        <input type="hidden" id="price" name="price" value="{{$item->price}}">
                                        <button id="add-product">+ Thêm ngay</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
    <div class="col-3 p-3 border-left">
        <div class="d-flex align-items-center justify-content-between">
            <b class="h5">{{$table->name}}</b>
            <b id="event-history"><a href="#"><i class="fa-solid fa-cart-shopping"></i></a></b>
        </div>
        <div class="row pt-3">
            <div class="">
                <div id="list-product-order" class="list-group overflow-auto cart">
                    {{-- phần show sản phẩm đang được order --}}
                </div>
            </div>
            <div class="col-12">
                <div class="d-flex justify-content-between px-4 pt-5">
                    <b>Tổng</b>
                    <b id="total"></b>
                </div>
                <div class="d-flex justify-content-between px-4 pt-3">
                    <span class="text-muted">Thuế</span>
                    <span class="text-muted">8%</span>
                    <input type="hidden" name="tax" id="tax" value="8">
                </div>
                <div class="p-4">
                    <div class="border-top"></div>
                </div>
                <div class="d-flex justify-content-between px-4 pt-3">
                    <b>Tổng cộng:</b>
                    <b id="after-tax-price"></b>
                </div>
            </div>
            <div class="col-12">
                <div class="row mt-5">
                    <div class="col-12 ml-auto text-center">
                        <button id="add-order" class="btn btn-dark py-3 px-6">
                            Đặt hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="id-history-order" class="order-history-none">
        <div id="id-history-order-out" class="order-history-back">

        </div>
        <div class="body-order-history">
            <div id="show-box" class="no-order-none">
                <h1>Chưa có order nào</h1>
            </div>
            <div class="history-order-title">
                <div class="id-order-history">
                    <span id="history-#"></span>
                    <p>Chưa thanh toán</p>
                </div>
                <span>Chi tiết</span>
            </div>
            <div class="history-order-info">
                <div class="history-info-item">
                    <span>Thời gian</span>
                    <p id="history-date"></p>
                </div>
                <div class="history-info-item">
                    <span>Tên bàn</span>
                    <p id="history-table"></p>
                </div>
                <div class="history-info-item">
                    <span>Người order</span>
                    <p id="history-user-order"></p>
                </div>
            </div>
            <div class="history-order-product">
                <span>Đơn hàng</span>
                <div id="show-product-history" class="body-history-order-product">
                    
                </div>
                
                
            </div>
            <div id="body-front-button" class="body-front-button">
                <div  class="history-order-button">
                    <button id="history-button-invoices">In hóa đơn tạm tính </button>
                </div>
                <div  class="history-order-button">
                        <button id="add-invoices" class="">
                            Thanh toán
                        </button>
                </div>
            </div>
            
        </div>
    </div>
    <div class="all-body-correct-product">
        <div class="body-correct-product">
            <div class="back-correct">

            </div>
            <div class="body-correct">
                <div class="show-product-correct"> 
                    <div id="correct" class="item-product-correct">
                        <div class="info-product-correct">
                             <div class="img-product-correct">
                                 <img src="/assets/img/pexels-jonathan-borba-2878741-1.png" alt="">
                             </div>
                             <div class="tital-product-correct">
                                 <span> Bánh mỳ ba rọi </span>
                                 <span> 20.000đ</span>
                             </div>
                        </div>
                         <div class="price-product-correct">
                            <input id="id-product-correct" name="id-product-correct" type="hidden" value="1">
                             <input id="mount-correct" name="amount-correct" type="text" value="1" disabled>
                         </div>
                         <div class="lick-radio-correct">
                             <input id="check-correct" name="check-correct" type="checkbox" name="" id="">
                         </div>
                     </div>
                    <div class="item-product-correct">
                        <div class="info-product-correct">
                             <div class="img-product-correct">
                                <img src="/assets/img/pexels-jonathan-borba-2878741-1.png" alt="">
                             </div>
                             <div class="tital-product-correct">
                                 <span> Bánh mỳ ba rọi </span>
                                 <span> 20.000đ</span>
                             </div>
                        </div>
                         <div class="price-product-correct">
                             <input type="text" value="1">
                         </div>
                         <div class="lick-radio-correct">
                             <input type="checkbox" name="" id="">
                         </div>
                     </div>
                    <div class="item-product-correct">
                       <div class="info-product-correct">
                            <div class="img-product-correct">
                                <img src="/assets/img/pexels-jonathan-borba-2878741-1.png" alt="">
                            </div>
                            <div class="tital-product-correct">
                                <span> Bánh mỳ ba rọi </span>
                                <span> 20.000đ</span>
                            </div>
                       </div>
                        <div class="price-product-correct">
                            <input type="text" value="1">
                        </div>
                        <div class="lick-radio-correct">
                            <input type="checkbox" name="" id="">
                        </div>
                    </div>
                </div>
                <div class="button-save">
                    <button>Lưu</button>
                </div>
            </div>
        </div>
    </div>
    </div>
@endsection
@section('bill')
    <div id="bill" class="item-bill-none" style="">
        <div class="item-bill-id">
            <span id="bill-randumNumber">Đơn hàng #20211</span>
        </div>
        <div class="item-bill-info">
            {{-- <div class="item-info">
                <span> Họ và tên</span>
                <span id="bill-name-user">{{Auth::user()->name}}</span>
            </div> --}}
            <div class="item-info">
              <span>Bàn</span>
              <span class="bill-table">{{$table->name}}</span>
            </div>
            <div class="item-info"> 
                <span>Thanh toán bằng</span>
                <span>Tiền mặt</span>
            </div>
        </div>
        <div id="item-bill-product" class="item-bill-product">
            {{-- show sản phẩm bằng js --}}
        </div>
        <div class="item-bill-into-money">
            <div class="into-money-total">
              <span>Tổng</span>
              <span id="total-product">60.000đ</span>
            </div>
            <div class="into-mony-tax">
              <span>Phí dịch vụ</span>
              <span>8%</span>
            </div>
            <div class="into-mony-pay">
              <span>Tổng cộng</span>
              <span id="total-bill">80.000đ</span>
            </div>
        </div>
      </div>
@endsection
@push('scripts')
    <script type="module" src="{{asset('assets/js/menu.js')}}"></script>
    <script type="module" src="/assets/js/jquery.slim.min.js"></script>
    <script type="module" src="/assets/js/popper.min.js"></script>
    <script type="module" src="/assets/js/bootstrap.min.js"></script>
@endpush