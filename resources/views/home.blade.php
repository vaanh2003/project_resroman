@extends('layouts.layout')
@push('styles')
    <link rel="stylesheet" href="{{asset('assets/css/style.css')}}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
@endpush
@section('content')
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
        <div class="list-group overflow-auto product pt-5">
            <div id="table" class="row m-0 px-2">
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 1</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 2</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 3</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 4</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 5</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 6</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 7</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 8</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 9</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 10</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 11</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 12</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 13</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 14</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 15</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 16</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 17</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 18</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 19</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-2.5 col-table mb-3">
                    <div class="card text-center mx-3">
                        <a href="#" class="item-table">
                            <img class="py-3 w-50 d-block mx-auto" src="{{asset('assets/img/table.svg')}}">
                            <div class="card-body border-top py-2">
                                <h6>Bàn 20</h6>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-3 p-3 border-left">
        <div class="d-flex justify-content-center my-3">
            <b class="h5">Đơn hàng từ mã QR</b>
        </div>
        <div class="row my-3">
            <div class="col-12">
                <div class="list-group overflow-auto cart">
                    <div class="row m-0 my-2">
                        <div class="col-12 p-0 mb-3">
                            <div class="card card-qr">
                                <div class="card-body">
                                    <a href="#" data-toggle="modal" data-target="#bill">
                                        <div class="row">
                                            <div class="col-7">
                                                <h6 class="font-weight-bold order">Đơn hàng #20231</h6>
                                                <span class="text-muted mr-5">19:10</span>
                                                <span class="text-muted">Bàn: 1</span>
                                            </div>
                                            <div class="col-5 text-right">
                                                <b class="text-main text-small">Đã order</b>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 p-0 mb-3">
                            <div class="card card-qr">
                                <div class="card-body">
                                    <a href="#">
                                        <div class="row">
                                            <div class="col-7">
                                                <h6 class="font-weight-bold">Đơn hàng #20232</h6>
                                                <span class="text-muted mr-5">20:05</span>
                                                <span class="text-muted">Bàn: 2</span>
                                            </div>
                                            <div class="col-5 text-right">
                                                <b class="text-main text-small">Đã thanh toán</b>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 p-0 mb-3">
                            <div class="card card-qr">
                                <div class="card-body">
                                    <a href="#">
                                        <div class="row">
                                            <div class="col-7">
                                                <h6 class="font-weight-bold">Đơn hàng #20233</h6>
                                                <span class="text-muted mr-5">20:40</span>
                                                <span class="text-muted">Bàn: 3</span>
                                            </div>
                                            <div class="col-5 text-right">
                                                <b class="text-main text-small">Đã huỷ</b>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="bill" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header" style="display: block;">
                <h5 class="modal-title">
                    <div class="d-flex">
                        <h5>Đơn hàng #20231</h5>
                        <h6 class="text-main ml-auto">Đã thanh toán</h6>
                    </div>
                </h5>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <b class="h6">Chi tiết</b>
                        <div class="row p-0 mt-3 text-center">
                            <div class="col-3 px-0 text-muted">Thời gian</div>
                            <div class="col-2 px-0 text-muted">Số bàn</div>
                            <div class="col-4 px-0 text-muted">Người thanh toán</div>
                            <div class="col-3 px-0 text-muted">Thanh toán</div>
                        </div>
                        <div class="row p-0 mt-2 text-center">
                            <b class="col-3 px-0">20:10</b>
                            <b class="col-2 px-0">3</b>
                            <b class="col-4 px-0">Ngô Quốc Cường</b>
                            <b class="col-3 px-0">Tiền mặt</b>
                        </div>
                    </div>
                    <div class="col-12 mt-5">
                        <b class="h6">Đơn hàng</b>
                        <div class="d-flex justify-content-between p-4">
                            <img src="img/pexels-rajesh-tp-1633572-1.png" class="img-fit">
                            <b class="align-self-center ml-n5">Nui xào bò <span class="ml-2">x2</span></b>
                            <b class="text-main align-self-center">60.000đ</b>
                        </div>
                        <div class="d-flex justify-content-between p-4">
                            <img src="img/pexels-rajesh-tp-1633572-1.png" class="img-fit">
                            <b class="align-self-center ml-n5">Nui xào bò <span class="ml-2">x3</span></b>
                            <b class="text-main align-self-center">90.000đ</b>
                        </div>
                        <div class="d-flex justify-content-between p-4">
                            <img src="img/pexels-rajesh-tp-1633572-1.png" class="img-fit">
                            <b class="align-self-center ml-n5">Nui xào bò <span class="ml-2">x4</span></b>
                            <b class="text-main align-self-center">120.000đ</b>
                        </div>
                        <div class="d-flex justify-content-between p-4">
                            <img src="img/pexels-rajesh-tp-1633572-1.png" class="img-fit">
                            <b class="align-self-center ml-n5">Nui xào bò <span class="ml-2">x5</span></b>
                            <b class="text-main align-self-center">150.000đ</b>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" onclick="window.location='print.html';"
                    class="btn w-100 btn-main p-3">In hoá đơn</button>
            </div>
        </div>
    </div>
</div>
@endsection
@push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js"></script>
    <script src="{{asset('assets/js/style.js')}}"></script>
@endpush
