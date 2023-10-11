<?php

namespace App\Models;

use App\Events\ProductCreated;
use App\Events\ProductDeleted;
use App\Events\ProductUpdated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'product';
    protected $fillable = ['id','id_category','name','img','price','status'];
    protected $dispatchesEvents =[
        'created' => ProductCreated::class,
        'deleted' => ProductDeleted::class,
        'updated' => ProductUpdated::class,
    ];

    
    // protected static function boot()
    // {
    //     parent::boot();

    //     static::creating(function ($product) {
           
    //         // Kiểm tra nếu id_user là 10
    //         if ($product->price == 10000) {
    //             // \Log::debug("Created {$product}");
    //             event(new \App\Events\ProductCreated($product)); 
    //         }
    //     });
    // }
}
