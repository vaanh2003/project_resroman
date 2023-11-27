@extends('layouts.login')
@push('styles')
    <link rel="stylesheet" href="{{asset('/assets/css/style-mobile.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/css/slick.min.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/css/mobile.css')}}">
@endpush
@section('content')
<input id="table" type="hidden" name="table" value="{{$table->id}}">
<input id="id_user" type="hidden" name="id_user" value="3">
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="div-none">

            </div>
            <div class="header-mobile row">
                <div class="col-auto mr-auto">
                    <a href="index_mb.html">
                        <img src="/assets/img/logo.svg" width="32">
                    </a>
                </div>
                <div class="col-7 mx-auto">
                    <div class="input-group mb-4 border rounded-pill px-1">
                        <input type="search" placeholder="Tìm kiếm?" class="form-control bg-none border-0"
                            style="padding: .375rem .75rem;">
                        <div class="input-group-append border-0">
                            <button class="btn btn-link"><img src="/assets/img/search.svg" width="15"></button>
                        </div>
                    </div>
                </div>
                <div id="button-show-cart" class="col-auto">
                        <img class="ml-2 float-left" src="/assets/img/uil_cart.svg" />
                        <div class="cart-num px-1 d-flex justify-content-center align-items-center">2</div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 p-0 mb-3">
                    <a href="index.html">
                        <img class="img-fluid w-100" src="/assets/img/banner.png" />
                    </a>
                </div>
            </div>
            <div class="button-lilter">
                <span>Loại sản phẩm <i class="fa-solid fa-chevron-down"></i></i></span>
                <ul class="list-category" >
                    @foreach ($data as $dataLilter)
                        <li id="button-category"> 
                            <input type="hidden" name="id_category" id="id_category" value="{{$dataLilter['category']->id}}">
                            {{$dataLilter['category']->name}}</li>
                    @endforeach
                </ul>
            </div>
            @if ($productSale  != [])
                <div class="row">
                    <div class="col-12 my-3">
                        <h6 class="font-weight-bolder">Khuyến mãi</h6>
                    </div>
                    <div class="col-12">
                        <div class="items">
                            @foreach ($productSale as $item)
                                <div class="card">
                                    <div class="item-img-product">
                                        <img class=""
                                        src="/assets/img/{{$item->img}}">
                                    </div>
                                    <div class="card-body">
                                        <div class=" item-product-name d-flex justify-content-center">
                                            <span class=" card-title item-show-title">{{$item->name}}</span>
                                        </div>
                                        <div class="d-flex justify-content-between item-show-price">
                                            <del>
                                                <p>40.000đ</p>
                                            </del>
                                            <span class="text-main">{{$formattedPrice = number_format($item->price, 0, ',', ',')}}đ</span>
                                        </div>
                                        <div class="d-flex justify-content-center mt-3 Item-button-add">
                                            <div class="d-flex justify-content-center mt-3 Item-button-add">
                                                <div class="form-add">
                                                    <input type="hidden" id="id_product" name="id_product" value="{{$item->id}}">
                                                    <input type="hidden" id="name" name="name" value="{{$item->name}}">
                                                    <input type="hidden" id="id_category" name="id_category" value="{{$item->id_category}}">
                                                    <input type="hidden" id="img" name="img" value="{{$item->img}}">
                                                    <input type="hidden" id="price" name="price" value="{{$item->price}}">
                                                    <button class=" btn btn-main" id="add-product-mobile">+ Thêm ngay</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                            
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                            <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32px" height="32px"
                                id="circle" fill="none" stroke="currentColor">
                                <circle r="20" cy="22" cx="22">
                            </symbol>
                        </svg>
                    </div>
                </div>
            @endif
            @php
                $i = 1;
            @endphp
            <div id="body-all-product-cate" class="col-12">
                @foreach ($data as $item)
                    <div class="list-group">
                        <div class="col-auto my-3">
                            <h6 class="font-weight-bolder">{{$item['category']->name}}</h6>
                        </div>
                        <div class="body-show-product">
                            @php $count = 0 @endphp
                            @foreach ($item['productCategory'] as $product)
                                @if ($count < 2)
                                    <div class=" animation-show item-body-show-product ">
                                        <div class="card">
                                            <div class="item-img-product">
                                                <img class=""
                                                src="/assets/img/{{$product->img}}">
                                            </div>
                                            <div class="card-body p-0">
                                                <div class=" item-product-name d-flex justify-content-center">
                                                    <h6 class="card-title">{{$product->name}}</h6>
                                                </div>
                                                <div class="d-flex justify-content-center">
                                                    <h6 class="text-main">{{$formattedPrice = number_format($product->price, 0, ',', ',')}}đ</h6>
                                                </div>
                                                <div class="d-flex justify-content-center mt-3 Item-button-add">
                                                    <div class="form-add">
                                                        <input type="hidden" id="id_product" name="id_product" value="{{$product->id}}">
                                                        <input type="hidden" id="name" name="name" value="{{$product->name}}">
                                                        <input type="hidden" id="id_category" name="id_category" value="{{$product->id_category}}">
                                                        <input type="hidden" id="img" name="img" value="{{$product->img}}">
                                                        <input type="hidden" id="price" name="price" value="{{$product->price}}">
                                                        <button class=" btn btn-main" id="add-product-mobile">+ Thêm ngay</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    @php $count++ @endphp
                                @else
                                    @break
                                @endif
                            @endforeach
                        </div>
                        <span class="content-item" id="content-{{$i}}">
                            <div class="body-show-product">
                                @php $count = 0 @endphp
                                @foreach ($item['productCategory'] as $product)
                                    @if ($count >= 2)
                                        <div class=" animation-show item-body-show-product">
                                            <div class="card">
                                                <div class="item-img-product">
                                                    <img class=""
                                                    src="/assets/img/{{$product->img}}">
                                                </div>
                                                <div class="card-body">
                                                    <div class=" item-product-name d-flex justify-content-center">
                                                        <h6 class="card-title">{{$product->name}}</h6>
                                                    </div>
                                                    <div class="d-flex justify-content-center">
                                                        <h6 class="text-main">{{$formattedPrice = number_format($product->price, 0, ',', ',')}}đ</h6>
                                                    </div>
                                                    <div class="d-flex justify-content-center mt-3 Item-button-add">
                                                        <div class="form-add">
                                                            <input type="hidden" id="id_product" name="id_product" value="{{$product->id}}">
                                                            <input type="hidden" id="name" name="name" value="{{$product->name}}">
                                                            <input type="hidden" id="id_category" name="id_category" value="{{$product->id_category}}">
                                                            <input type="hidden" id="img" name="img" value="{{$product->img}}">
                                                            <input type="hidden" id="price" name="price" value="{{$product->price}}">
                                                            <button class=" btn btn-main" id="add-product-mobile">+ Thêm ngay</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    @endif
                                    @php $count++ @endphp
                                @endforeach
                            </div>
                        </span>
                        <div class="col-12 mb-4">
                            <div class="d-flex justify-content-center mt-3">
                                <button class=" more-btn btn btn-main px-4" id="more">Xem thêm</button>
                            </div>
                        </div>
                    </div>
                    @php
                        $i++;
                    @endphp
                @endforeach
            </div>
            
        </div>
    </div>
</div>
<footer class="footer">
    <div class="container-fluid bg-main">
        <div class="d-flex justify-content-around mt-3">
            <div class="text-dark py-3">
                <h6><img src="/assets/img/phone.svg"> 1800 6080</h6>
            </div>
            <div class="text-dark py-3">
                <h6><img src="/assets/img/mail.svg"> service@restoman.com.vn</h6>
            </div>
        </div>
    </div>
</footer>

<div class="show-cart-mobile-none" id="body-cart-mobile">
    <div class="back-cart-mobile" id="back-cart">

    </div>
    <div class="item-show-cart">
        <div class="d-flex align-items-center justify-content-between">
            <b class="h5">{{$table->name}}</b>
        </div>
        <div class="row pt-3">
            <div class="">
                <div id="list-product-order" class="list-group overflow-auto list-product-order">
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
</div>


@endsection
@push('scripts')
    <script src="/assets/js/jquery.min.js"></script>
    <script src="/assets/js/bootstrap.min.js"></script>
    <script src="/assets/js/slick.min.js"></script>
    <script src="/assets/js/mobile.js"></script>
    <script src="/assets/js/order-mobile.js"></script>
@endpush