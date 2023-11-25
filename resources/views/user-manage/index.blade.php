@extends('layouts.layout')
@push('styles')

    <link rel="stylesheet" href="{{asset('assets/css/product.css')}}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
@endpush
@section('content')
            <div class="col-11 mt-5 pl-0 pr-4">
                <div class="row">
                    <div class=" body-content col-6 mt-2 item-h2">
                        <h2 class="font-weight-bolder">Danh sách sản phẩm</h2><br>
                    </div>
                    <div class="col-6 text-right">
                        <a href="{{route('user-add')}}" class="btn">
                            <button class="button-add-product">Thêm sản phẩm</button>
                        </a>
                    </div>
                </div>
                <p><a href="{{route('category')}}">Quản lý loại sản phẩm</a></p>
                <div class="gridtable mt-4">
                    <table class="table table-bordered table-fixed" style="border-radius: 20px;">
                        <thead class="text-muted text-center">
                            <tr>
                                <th class="font-weight-bolder p-3 pb-4 h5">Tên</th>
                                <th class="font-weight-bolder p-3 pb-4 h5">Email</th>
                                <th class="font-weight-bolder p-3 pb-4 h5">SDT</th>
                                <th class="font-weight-bolder p-3 pb-4 h5">Chức vụ</th>
                                <th class="font-weight-bolder p-3 pb-4 h5">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($data as $item)
                                <tr id="user-{{$item->id}}">
                                    <td class="align-middle">
                                        <b class="h6 ml-2 font-weight-bolder">{{$item->name}}</b>
                                    </td>
                                    <td class="text-center align-middle">
                                        <h6 class="font-weight-bolder "> {{$item->email}} </h6>
                                    </td>
                                    <td class="text-center align-middle">
                                        <h6 class="font-weight-bolder">{{$item->sdt}}</h6>
                                    </td>
                                    <td class="text-center align-middle">
                                        <h6 class="font-weight-bolder">
                                            @if ($item->role == 1)
                                                Chủ
                                            @endif
                                            @if ($item->role==2)
                                                Quản lý
                                            @endif
                                            @if ($item->role == 3)
                                                Nhân viên
                                            @endif
                                        </h6>
                                    </td>
                                    <td class="text-center align-middle">
                                        <div class="row">
                                            <div class="col">
                                                <div class="item-button-delete-product">
                                                    <input type="hidden" name="id_user" value="{{$item->id}}">
                                                    <button id="button-delete-product" ><img src="assets/img/delete-1.svg"><b class="h6 text-green">Xoá</b></button>
                                                </div>
                                                {{-- <a data-toggle="modal" data-target="#delete">
                                                    <img src="assets/img/delete-1.svg"><b class="h6 text-green">Xoá</b>
                                                </a> --}}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
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
                            <span>Bạn muốn xóa user này ?</span>
                        </div>
                        <div class="body-notification-delete-buntton">
                            <input id="post-id-product" type="hidden" name="post-id-product" value="">
                            <button id="button-yes" class="button-yes">Có</button>
                            <button id="button-no" class="button-no">Không</button>
                        </div>
                    </div>
                </div>
           </div>
@endsection
@push('scripts')
    <script type="module" src="assets/js/manage-user.js"></script>
    <script type="module" src="assets/js/jquery.slim.min.js"></script>
    <script type="module" src="assets/js/popper.min.js"></script>
    <script type="module" src="assets/js/bootstrap.min.js"></script>
@endpush