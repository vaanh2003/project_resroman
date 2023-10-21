<?php

namespace App\Events;

use App\Models\Product;
use App\Models\ProductTable;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProductTableDeleted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;

    public $product;
    public $index;
    public $anh = 'hahaha';
    
    /**
     * Create a new event instance.
     */
    public function __construct(ProductTable $product)
    {
        $this->product = $product;
    }
    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn()
    {
        $channelName = 'product';
        $dynamicString = $this->product->id_table;
        $fullChannelName = $channelName . $dynamicString;
        return new Channel($fullChannelName);
    }
}
