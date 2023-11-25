@extends('layouts.login')
@push('styles')
    <link rel="stylesheet" href="{{asset('assets/css/login.css')}}">
@endpush
@section('content')
<div class="container">
    {{-- <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Login') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="row mb-3">
                            <label for="email" class="col-md-4 col-form-label text-md-end">{{ __('Email Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="password" class="col-md-4 col-form-label text-md-end">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Login') }}
                                </button>

                                @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                @endif
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> --}}
    <div id="wrapper" >
        <div class="left">
          <div class="img">
            <img src="{{asset('assets/img/Illustrationnew.png')}}" alt="anh dang nhap">
          </div>
        </div>
    
        <div class="right">
            <div class="body-form">
                <span class="item-title">Mừng bạn trở lại</span>
                <form method="POST" action="{{ route('login') }}">
                    @csrf

                    <div class="">
                        <div class="">
                            <div class="body-item-input body-input-email">
                                <i class="fa-solid fa-at"></i>
                                <input id="email" type="email" class="@error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" placeholder="Địa chỉ Email" autofocus>
                            </div>
                            @error('email')
                                <span class="" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>

                    <div class="">
                        <div class="">
                            <div class="body-item-input body-input-password">
                                <i class="fa-solid fa-lock"></i>
                                <input id="password" type="password" class="@error('password') is-invalid @enderror" name="password" required placeholder="Mật khẩu" autocomplete="current-password">
                            </div>
                            @error('password')
                                <span class="" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>

                    <div class="item-form-check">
                        <div class="">
                            <div class="form-check">
                                <input class="" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                <label class="" for="remember">
                                    {{ __('Remember Me') }}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="">
                        <div class="">
                            <button type="submit" class="button3">
                                {{ __('Login') }}
                            </button>

                            @if (Route::has('password.request'))
                                {{-- <a class="" href="{{ route('password.request') }}">
                                    {{ __('Forgot Your Password?') }}
                                </a> --}}
                            @endif
                        </div>
                    </div>
                </form>
            </div>
        </div>
      </div>
</div>

@endsection

@push('scripts')
<script src="https://kit.fontawesome.com/0e14a1ff4d.js" crossorigin="anonymous"></script>
@endpush
