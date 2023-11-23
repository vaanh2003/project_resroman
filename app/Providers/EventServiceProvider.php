<?php

namespace App\Providers;

use App\Events\UserSessionChanged;
use App\Listeners\BroadcastUserLogin;
use App\Listeners\BroadcastUserLogout;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        Login::class =>[
           BroadcastUserLogin::class,
        ],
        'Illuminate\Auth\Events\Logout' => [
            'App\Listeners\BroadcastUserLogout',
        ],
        // \App\Events\ProductCreated::class => [
        //     BroadcastUserLogin::class,
        // ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
