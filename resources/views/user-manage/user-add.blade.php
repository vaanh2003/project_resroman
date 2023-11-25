@extends('layouts.layout')
@push('styles')

    <link rel="stylesheet" href="{{asset('assets/css/product.css')}}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
@endpush
@section('content')
<div class="col-10 mt-5 pr-0">
    <div class="row">
        <div class="col-12 pl-0 mb-3">
            <h3>Thêm Nhân viên</h3>
        </div>
        <div class="col-12 rounded border p-4">
          
                <div class="button-back">
                    <a href="{{route('user-manage')}}">
                        <img src="assets/img/back.svg">
                    </a>
                </div>
           
            {{-- <button onclick="window.location='product.html';" class="btn btn-main p-1">
                <img src="assets/img/back.svg">
            </button> --}}
            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            <form class="item-form-all" method="POST" action="{{ route('user-create') }}" enctype="multipart/form-data">
                @csrf
            
                <div class="form-row item-form-add">
                    <div class="form-group col px-3">
                        <label class="h7">Tên:</label>
                        <input type="text" name="name" class="form-control" placeholder="Nhập tên" required>
                    </div>
            
                    <div class="form-group col px-3">
                        <label class="h7">Chức vụ:</label>
                        <select name="role" class="form-control" required>
                            <option selected disabled value="">Chọn chức vụ</option>
                            <option value="1">Chủ</option>
                            <option value="2">Quản lý</option>
                            <option value="3">Nhân viên</option>
        
                        </select>
                    </div>
                </div>
            
                <div class="form-row item-form-add">
                    <div class="form-group col px-3">
                        <label class="h7">SDT:</label>
                        <input type="number" name="sdt" class="form-control" placeholder="Nhập SDT" required>
                    </div>
            
                    <div class="form-group col px-3">
                        <label class="h7">Email:</label>
                        <input type="email" name="email" class="form-control" placeholder="Nhập email" required>
                    </div>
                </div>

                <div class="form-row item-form-add">
                    <div class="form-group col px-3">
                        <label class="h7">Mật khẩu:</label>
                        <input type="password" name="password" class="form-control" placeholder="Nhập mật khẩu" required>
                    </div>
                    
                    <div class="form-group col px-3">
                        <label class="h7">Nhập lại mật khẩu:</label>
                        <input type="password" name="password_confirmation" class="form-control" placeholder="Nhập lại mật khẩu" required>
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
    <script type="module">
        $('.custom-file-upload').click(function() {
            $('#file-input').click();
        });
    </script>
    <script type="module" src="assets/js/jquery.slim.min.js"></>
    <script type="module" src="assets/js/popper.min.js"></script>
    <script type="module" src="assets/js/bootstrap.min.js"></script>
@endpush