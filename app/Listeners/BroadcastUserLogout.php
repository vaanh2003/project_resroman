<?php

namespace App\Listeners;

use App\Events\UserSessionChanged;
use Illuminate\Auth\Events\Logout;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class BroadcastUserLogout
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Logout $event): void
{
    // Kiểm tra xem user có tồn tại không
    if ($event->user) {
        broadcast(new UserSessionChanged("{$event->user->name} is off", "danger"));
    } else {
        // Xử lý trường hợp user không tồn tại (có thể ghi log hoặc thực hiện hành động khác)
    }
}
}
