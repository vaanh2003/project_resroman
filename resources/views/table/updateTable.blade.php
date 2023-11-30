@extends('layouts.layout')
@push('styles')

    <link rel="stylesheet" href="{{asset('assets/css/product.css')}}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
@endpush
@section('content')
<div class="col-10 mt-5 pr-0">
    <div class="row">
        <div class="col-12 pl-0 mb-3">
            <h3>Thêm bàn</h3>
        </div>
        <div class="col-12 rounded border p-4">
          
                <div class="button-back">
                    <a href="{{route('table')}}">
                        <img src="/assets/img/back.svg">
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
            <form class="item-form-all" method="POST" action="{{ route('update-new-table') }}" enctype="multipart/form-data">
                @csrf
            
                <div class="form-row item-form-add">
                    <div class="form-group col px-3">
                        <label class="h7">Tên bàn:</label>
                        <input type="text" name="name" value="{{$table->name}}" class="form-control" placeholder="Nhập tên" required>
                    </div>
                    <input type="hidden" name="status" value="1">
                    <input type="hidden" name="id" value="{{$table->id}}">
                    <div class="form-group col px-3">
                        <label class="h7">Chức vụ:</label>
                        <select name="id_area" class="form-control" required>
                            <option selected disabled value="">Chọn khu vực</option>
                           @foreach ($data as $item)
                                <option @if ($table->id_area == $item->id)
                                    selected
                                @endif value="{{$item->id}}">{{$item->name}}</option>
                           @endforeach
        
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
    <script type="module">
        $('.custom-file-upload').click(function() {
            $('#file-input').click();
        });
    </script>
    <script type="module" src="assets/js/jquery.slim.min.js"></>
    <script type="module" src="assets/js/popper.min.js"></script>
    <script type="module" src="assets/js/bootstrap.min.js"></script>
@endpush