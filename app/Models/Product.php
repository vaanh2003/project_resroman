<?php

namespace App\Models;

use App\Events\ProductCreated;
use App\Events\ProductDeleted;
use App\Events\ProductUpdated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function table_product()
    {
        return $this->hasMany(ProductTable::class, 'id_product');
    }
    public function product_product()
    {
        return $this->hasMany(ProductInvoices::class, 'id_product');
    }
    public function or_product()
    {
        return $this->hasMany(ProductOrderModel::class, 'id_product');
    }
    use HasFactory;
    protected $table = 'product';
    protected $fillable = ['id','id_category','name','img','price','status','introduce'];
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
