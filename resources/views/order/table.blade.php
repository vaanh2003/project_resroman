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
        <div id="body-order">

        </div>
    </div>
@endsection
@push('scripts')
    <script type="module" src="{{asset('assets/js/home.js')}}"></script>
@endpush
       
    
