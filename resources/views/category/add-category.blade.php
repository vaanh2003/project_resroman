@extends('layouts.layout')
@push('styles')

    <link rel="stylesheet" href="{{asset('assets/css/product.css')}}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
@endpush
@section('content')
<div class="col-10 mt-5 pr-0">
    <div class="row">
        <div class="col-12 pl-0 mb-3">
            <h3>Thêm loại sản phẩm</h3>
        </div>
        <div class="col-12 rounded border p-4">
            <a href="{{route('category')}}">
                <div class="button-back">
                    <img src="assets/img/back.svg">
                </div>
            </a>
            {{-- <button onclick="window.location='product.html';" class="btn btn-main p-1">
                <img src="assets/img/back.svg">
            </button> --}}
            <form class="item-form-all" method="POST" action="{{ route('create-category') }}" enctype="multipart/form-data">
                @csrf
            
                <div class="form-row item-form-add">
                    <div class="form-group col px-3">
                        <label class="h7">Tên loại sản phẩm:</label>
                        <input type="text" name="name" class="form-control" placeholder="Nhập tên" required>
                    </div>
                    <div class="form-group col px-3">
                        <label class="h7">Tình trạng:</label>
                        <select name="status" class="form-control" required>
                            <option selected disabled value="">Chọn tình trạng</option>
                            <option value="1">Còn hàng</option>
                            <option value="2">Hết hàng</option>
                        </select>
                    </div>
                </div>
            
                <div class="d-flex justify-content-center my-3">
                    <button type="submit" class="button-create-product">Thêm</button>
                </div>
            </form>
            
        </div>
    </div>
</div>
@endsection
@push('scripts')
    <script type="module" src="assets/js/jquery.slim.min.js"></>
    <script type="module" src="assets/js/popper.min.js"></script>
    <script type="module" src="assets/js/bootstrap.min.js"></script>
@endpush