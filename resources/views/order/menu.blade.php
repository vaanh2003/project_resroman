@extends('layouts.app')
@push('styles')
    <style>
        .body{
            display: flex;
        }
        .menu{
            width: 50%;
        }
        .product-order{
            width: 50%;
        }
    </style>
@endpush
@section('content')
<div class="body">
    <div class="menu">
        <div>
            <input type="hidden" name="table" id="table" value="{{$id_table}}">
        </div>
        @foreach ($data as $item)
            <div>
                <p>{{$item->name}}</p>
                <span>{{$item->price}}</span>
                <hr>
            </div>
            <form id="form-post">
                <input id="id_product" type="hidden" name="id_product" value="{{$item->id}}">
                <input id="amount" type="number" name="amount" value="1">
                <button id="button" type="submit">Update</button>
            </form>
        @endforeach
    </div>
    <div id="products" class="product-order">
    
    </div>
</div>
@endsection
@push('scripts')
    {{-- <script type="module" src="{{asset('assets/js/order.js')}}"></script> --}}
    <script type="module" src="{{asset('assets/js/order.js')}}">
        
    </script>
@endpush
       