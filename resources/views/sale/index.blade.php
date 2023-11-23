@extends('layouts.layout')
@push('styles')
    <link rel="stylesheet" href="{{asset('assets/css/sale.css')}}">   
@endpush
@section('content')
    <section class="body-all-sale">
        <div class="body-product-sale">
            <div class="title-sale">
                <span>Tạo sale sản phẩm</span>
            </div>
            <div class="body-product-sale-new">
                @foreach ($data as $item)
                    <div id="item-product" class="item-product item-product-{{$item['product']->id}}">
                        <input type="hidden" name="product-id" value="{{$item['product']->id}}">
                        <input type="hidden" name="product->name" value="{{$item['product']->name}}">
                        <input type="hidden" name="product-img" value="{{$item['product']->img}}">
                        <input type="hidden" name="product-price" value="{{$item['product']->price}}">
                        <div class="item-info-product">
                            <div class="info-product-img">
                                <img src="{{asset('assets/img/'.$item['product']->img.'')}}" alt="">
                            </div>
                            <div class="info-product-name">
                                <span>{{$item['product']->name}}</span> <br>
                                <span>ID : {{$item['product']->id}}</span>
                            </div>
                        </div>
                        <div class="item-price">
                            <span>{{$formattedPrice = number_format($item['product']->price, 0, ',', ',')}}đ</span>
                        </div>
                        @if ($item['check'] == 1)
                            <div class="icon-sale">
                                <span>SALE</span>
                            </div>
                        @endif
                    </div> 
                @endforeach
            </div>
            <input type="hidden" name="">
        </div>

        <div class="body-pick-sale">
            <div class="title-sale">
                <div id="button-show-sale" class="button-show-sale">
                   
                </div>
                <div id="body-show-product-sale" class="order-history-none">
                    <div id="body-back" class="order-history-back">
            
                    </div>
                    <div class="body-order-history">
                        <div class="history-order-title">
                            <div class="id-order-history">
                                <span>Sản phẩm sale</span>
                            </div>
                        </div>
                        <div class="history-order-product">
                            <span>Sản phẩm</span>
                            <div class="body-history-order-product">
                                @foreach ($data_sale as $sale)
                                    <div class="item-history-product">
                                        <div class="body-show">
                                            <div class="img-history-product">
                                                <img src="{{asset('assets/img/'.$sale['product_sale']->img.'')}}" alt="">
                                            </div>
                                            <div class="info-history-product">
                                                <span>{{$sale['product_sale']->name_sale}}</span>
                                                <p>{{$formattedPrice = number_format($sale['product_sale']->price_sale, 0, ',', ',')}}đ</p>
                                            </div>
                                        </div>
                                        <div class="">

                                        </div>
                                    </div>
                                @endforeach
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-body-pick-sale">
                {{-- <div class="img-pick-sale">
                    <img src="{{asset('assets/img/pexels-rajesh-tp-1633525-1.png')}}" alt="">
                </div>
                <div class="info-pick-sale">
                    <div class="title-id-product">
                        <span>ID : 00000000</span>
                    </div>
                    
                    <div class="item-info-pick-sale">
                        <div class="item-form-product default-product">
                            <span>Tên sản phẩm :</span>
                            <input type="text" value="Trần Văn Anh">
                            <span>Giá sản phẩm :</span>
                            <input type="text" value="20.000đ">
                        </div>
                        <div class="item-form-product  sale-product">
                            <span>Tên sale :</span><br>
                            <input id="name-sale" value="" name="name-sale" type="text"><br>
                            <span>Giá sale :</span><br>
                            <input id="price-sale" name="price-sale" type="text">
                        </div>
                    </div>
                    <div class="button-create-sale">
                        <button id="button-sale">Thêm mới</button>
                    </div>
                </div> --}}
            </div>

        </div>
    </section>
@endsection
@push('scripts')
    <script type="module" src="{{asset('assets/js/sale.js')}}"></script>
@endpush