<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">

    <!-- Scripts -->
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
    @stack('styles')
    @stack('styles')
</head>
<body>
    <div class="container-fluid">
        <div class="row body-all">
            <div class="col-1 p-0">
                <div id="sidebar">
                    <header>
                        <a href=index.html><img src="{{asset('assets/img/logo.svg')}}"></a>
                    </header>
                    <ul class="list-group border-right">
                        <li class="list-group-item border-0 py-4 pt-5">
                            <a href={{route('home')}}>
                                <img src="{{asset('assets/img/home.svg')}}">
                            </a>
                        </li>
                        <li class="list-group-item border-0 py-4">
                            <a href="table.html">
                                <img src="{{asset('assets/img/dashboard.svg')}}">
                            </a>
                        </li>
                        <li class="list-group-item border-0 py-4">
                            <a href="#">
                                <img src="{{asset('assets/img/order.svg')}}">
                            </a>
                        </li>
                        <li class="list-group-item border-0 py-4">
                            <a href="#">
                                <img src="{{asset('assets/img/product.svg')}}">
                            </a>
                        </li>
                        <li class="list-group-item border-0 py-4">
                            <a href="#">
                                <img src="{{asset('assets/img/notification-1.svg')}}">
                            </a>
                        </li>
                        <li class="list-group-item border-0 py-4">
                            <a href="#">
                                <img src="{{asset('assets/img/customers.svg')}}">
                            </a>
                        </li>
                        <li class="list-group-item border-0 py-4">
                            <a href="#">
                                <img src="{{asset('assets/img/message.svg')}}">
                            </a>
                        </li>
                        <li class="list-group-item border-0 py-4 pb-5">
                            <a href="#">
                                <img src="{{asset('assets/img/setting.svg')}}">
                            </a>
                        </li>
                        <li class="list-group-item border-0 py-4 pb-5"></li>
                    </ul>
                </div>
            </div>
    @yield('content')
        </div>
    @stack('scripts')
</body>
</html>