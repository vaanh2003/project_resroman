@extends('layouts.app')
@section('content')
    <div>
        @foreach ($data as $item)
            <a href="{{ route('orderid', ['id' => $item->id]) }}">
                <div>
                    <p>{{$item->name}}</p>
                </div>
            </a>
        @endforeach
    </div>
@endsection
@push('scripts')
    <script type="model" src="{{asset('assets/js/order.js')}}"></script>
@endpush
       
    
