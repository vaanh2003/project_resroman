@extends('layouts.layout')
@push('styles')

    <link rel="stylesheet" href="{{asset('assets/css/product.css')}}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
@endpush
@section('content')
<div class="col-10 mt-5 pr-0">
    <div class="row">
        <div class="col-12 pl-0 mb-3">
            <h3>Thêm sản phẩm</h3>
        </div>
        <div class="col-12 rounded border p-4">
            <a href="{{route('product')}}">
                <div class="button-back">
                    <img src="/assets/img/back.svg">
                </div>
            </a>
            {{-- <button onclick="window.location='product.html';" class="btn btn-main p-1">
                <img src="assets/img/back.svg">
            </button> --}}
            <form class="item-form-all" method="POST" action="{{ route('product-update') }}" enctype="multipart/form-data">
                @csrf
                <input type="hidden" name="id" value="{{$data->id}}">
                <div class="text-center body-img-add-product">
                    <label for="file-input" class="custom-file-upload">
                        <img src="/assets/img/{{$data->img}}" class="img-product-option upload-icon"> Thay đổi hình ảnh
                    </label>
                    <input  id="file-input" name="file_upload" type="file" accept="image/*" />
                </div>
                {{-- @error('img')
                    <div class="alert alert-danger">{{ $message }}</div>
                @enderror --}}
            
                <div class="form-row item-form-add">
                    <div class="form-group col px-3">
                        <label class="h7">Tên sản phẩm:</label>
                        <input type="text" name="name" class="form-control" value="{{$data->name}}" placeholder="Nhập tên sản phẩm" required>
                    </div>
                    @error('name')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror
            
                    <div class="form-group col px-3">
                        <label class="h7">Loại sản phẩm:</label>
                        <select name="id_category" class="form-control" required>
                            <option selected disabled value="">Chọn loại sản phẩm</option>
                            @foreach ($category as $item)
                                @if ($item->id == $data->id_category)
                                    <option selected value="{{$item->id}}">{{$item->name}}</option>
                                @else
                                    <option value="{{$item->id}}">{{$item->name}}</option>
                                @endif
                                
                            @endforeach
                        </select>
                    </div>
                    @error('category')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror
                </div>
            
                <div class="form-row item-form-add">
                    <div class="form-group col px-3">
                        <label class="h7">Giá:</label>
                        <input type="number" name="price" class="form-control" value="{{$data->price}}" placeholder="Nhập giá" required>
                    </div>
                    @error('price')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror
            
                    <div class="form-group col px-3">
                        <label class="h7">Tình trạng:</label>
                        <select name="status" class="form-control" required>
                            <option selected disabled value="">Chọn tình trạng</option>
                            @if ($data->status == 1)
                                <option selected value="1">Còn hàng</option>
                                <option  value="2">Hết hàng</option>
                            @else
                                <option value="1">Còn hàng</option>
                                <option selected value="2">Hết hàng</option>
                            @endif
                        </select>
                    </div>
                    @error('status')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror
                </div>
            
                <div class="d-flex justify-content-center my-3">
                    <button type="submit" class="button-create-product">Lưu</button>
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