@extends('layouts.layout')
@push('styles')
    <link rel="stylesheet" href="{{asset('assets/css/menu.css')}}">
    <link rel="stylesheet" href="{{asset('assets/css/style.css')}}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
@endpush
@section('content')
    <input id="table" type="hidden" name="table" value="{{$table->id}}">
    <input id="id_user" type="hidden" name="id_user" value="{{Auth::user()->id}}">
    <div class="col-8 pl-0">
        <div class="row pt-3">
            <div class="col-2">
                <a href=index.html>
                    <p class="logo"><span class="span">Resto</span><span class="text">Man</span></p>
                </a>
            </div>
            <div class="col-7 mr-3">
                <div class="input-group mb-4 border rounded-pill p-1">
                    <input type="search" placeholder="Tìm kiếm?" class="form-control bg-none border-0">
                    <div class="input-group-append border-0">
                        <button type="button" class="btn btn-link"><img src="{{asset('assets/img/union.svg')}}"></button>
                    </div>
                </div>
            </div>
            <div class="col-2"><img class="bg-main rounded-circle ml-5 p-2" src="{{asset('assets/img/notification.svg')}}" /></div>
        </div>
        <div class="row p-3">
            <div class="col-3 p-0">
                <div class="bg-main rounded-br p-2 mx-3 text-light text-center">
                    <a href="#" class="text-white">Tất cả</a>
                </div>
            </div>
            <div class="col-3 p-0">
                <div class="bg-main rounded-br p-2 mx-3 text-white text-center">
                    <a href="#" class="text-white"><img src="{{asset('assets/img/fluent-food-24-filled.svg')}}" /> Thức ăn</a>
                </div>
            </div>
            <div class="col-3 p-0">
                <div class="bg-main rounded-br p-2 mx-3 text-white text-center">
                    <a href="#" class="text-white"><img src="{{asset('assets/img/ep-cold-drink.svg')}}" /> Thức uống</a>
                </div>
            </div>
            <div class="col-3 p-0">
                <div class="bg-main rounded-br p-2 mx-3 text-white text-center">
                    <a href="#" class="text-white"><img src="{{asset('assets/img/grommet-icons-ice-cream.svg')}}" /> Ăn vặt</a>
                </div>
            </div>
        </div>
        <div class="list-group overflow-auto product">
            <div class="row m-0">
                @foreach ($data as $item)
                    <div class="col-4 mb-3">
                        <div class="card">
                            <img class="card-img-top pt-3 px-4" src="{{asset('assets/img/'.$item->img)}}">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <h5 class="card-title">{{$item->name}}</h5>
                                    <h5 class="text-main">{{$formattedPrice = number_format($item->price, 0, ',', ',')}}đ</h5>
                                </div>
                                <p class="card-text">Đây là nui xào bò ngon nhất trên thế giới</p>
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
        <div class="d-flex justify-content-between">
            <b class="h5">{{$table->name}}</b>
            <b><a href="#"><img src="{{asset('assets/img/close.svg')}}" class="w-75"></a></b>
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
                    <div class="col-3 mr-auto text-center">
                        {{-- <button onclick="window.location='print.html';" class="btn btn-main ml-4 py-3 px-7">
                            In
                        </button> --}}
                    </div>
                    <div class="col-7 ml-auto text-center">
                        <button id="add-order" class="btn btn-dark py-3 px-6" data-toggle="modal" data-target="#bill">
                            Đặt hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div class="modal fade" id="bill" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Đơn hàng #2023</h5>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12 p-0">
                        <div class="d-flex justify-content-between px-4 my-2">
                            <b>Họ và tên</b>
                            <b>Ngô Quốc Cường</b>
                        </div>
                        <div class="d-flex justify-content-between px-4 my-2">
                            <b>Bàn</b>
                            <b>1</b>
                        </div>
                        <div class="d-flex justify-content-between px-4 my-2">
                            <b>Thanh toán bằng</b>
                            <b>Tiền mặt</b>
                        </div>
                        <div class="p-4">
                            <div class="border-top"></div>
                        </div>
                        <div class="row px-4">
                            <div class="col-6 text-left"><b>1). Nui xào bò</b></div>
                            <div class="col-2 text-center"><b>1</b></div>
                            <div class="col-4 text-right"><b>30.000đ</b></div>
                        </div>
                        <div class="row px-4">
                            <div class="col-6 text-left"><b>2). Nui xào trứng</b></div>
                            <div class="col-2 text-center"><b>1</b></div>
                            <div class="col-4 text-right"><b>30.000đ</b></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-body pt-5">
                <div class="row">
                    <div class="col-12 p-0">
                        <div class="d-flex justify-content-between px-4">
                            <b>Tổng</b>
                            <b id="total"></b>
                        </div>
                        <div class="d-flex justify-content-between px-4 pt-3">
                            <span class="text-muted">Phí dịch vụ</span>
                            <span class="text-muted">20.000đ</span>
                        </div>
                        <div class="p-4">
                            <div class="border-top"></div>
                        </div>
                        <div class="d-flex justify-content-between px-4">
                            <b>Tổng cộng:</b>
                            <b>80.000đ</b>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer d-block mx-auto">
                <button onclick="window.location='print.html';" class="btn btn-main p-3 px-5">In
                    hoá đơn</button>
            </div>
        </div>
    </div>
    </div>
@endsection
@push('scripts')
    <script type="module" src="{{asset('assets/js/menu.js')}}"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js"></script>
@endpush