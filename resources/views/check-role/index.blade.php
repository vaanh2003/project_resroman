@extends('layouts.layout')
@push('styles')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="{{asset('assets/css/style.css')}}">
@endpush
@section('content')
    <div class="col-11 mt-3 mt-lg-5 mx-auto">
        <div class="text-center">
            <img src="assets/img/illustration.png" class="img-fluid">
            <div class="mt-5">
                <h2 class="font-weight-bolder mb-3">Bạn không có quyền vào trang này</h2>
                <h5 class="text-muted"></h5>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
    <script type="module" src="{{asset('assets/js/home.js')}}"></script>
    <script type="module" src="assets/js/jquery.slim.min.js"></script>
    <script type="module" src="assets/js/popper.min.js"></script>
    <script type="module" src="assets/js/bootstrap.min.js"></script>
@endpush