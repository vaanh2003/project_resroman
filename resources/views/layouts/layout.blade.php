<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="icon" href="{{asset('assets/img/logo.svg')}}" type="image/png">

    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('assets/css/style.css')}}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Scripts -->
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
    @stack('styles')
</head>
<body id="body">
    <div id="body-content">
        <div class="body-all">
            <div id="body-home-menu" class="p-0 body-home-menu">
                <div id="sidebar" class="list-menu-db">
                    <header>
                        <div class="img-header">
                            <a href={{route('home')}}><img src="{{asset('assets/img/logo.svg')}}"></a>
                        </div>
                        <ul class="">
                            <li class="">
                                <a href={{route('home')}}>
                                    <i id="icon-home" class="fa-solid fa-house-fire icon-header"></i>
                                </a>
                            </li>
                            @if (Auth::user()->role != 3)
                                <li class="">
                                    <a href="{{route('product')}}">
                                        <i id="icon-product" class="fa-solid fa-burger icon-header"></i>
                                    </a>
                                </li>
                                <li class="">
                                    <a href="{{route('sale')}}">
                                        <i id="icon-sale" class="fa-solid fa-tags icon-header"></i>
                                    </a>
                                </li>
                                <li class="">
                                    <a href="{{route('history')}}">
                                        <i id="icon-history-order" class="fa-solid fa-clipboard icon-header"></i>
                                    </a>
                                </li>
                                <li class="">
                                    <a href="{{route('statistics')}}">
                                        <i id="icon-statistics" class="fa-solid fa-chart-pie icon-header"></i>
                                    </a>
                                </li>
                                <li class="">
                                    <a href="{{route('user-manage')}}">
                                        <i id="icon-user" class="fa-solid fa-users icon-header"></i>
                                    </a>
                                </li>
                                <li class="">
                                    <a href="{{route('table')}}">
                                        <i id="icon-table" class="fa-solid fa-table icon-header"></i>
                                    </a>
                                </li>
                            @endif
                            <li class="setting">
                                <a href="{{route('info-user')}}">
                                    <i id="icon-setting" class="fa-solid fa-gear icon-header"></i>
                                </a>
                                {{-- <div class="extra-menu">
                                   <span><a href="http://">Trần Văn Anh</a></span>
                                   <span><a href="http://">Trần Văn Anh</a></span>
                                </div> --}}
                            </li>
                        </ul>
                    </header>
                </div>
                <div id="back-menu" class="back-menu">

                </div>
            </div>
    @yield('content')
        </div>
    @yield('bill')
    @stack('scripts')
</body>
</html>