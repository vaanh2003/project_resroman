<?php

namespace App\Models;

use App\Events\OrderCreated;
use App\Events\OrderUpdated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public function order_invoices(){
        return $this->hasMany(Invoices::class, 'id_order');
    }
    public function product_order()
    {
        return $this->hasMany(ProductOrderModel::class, 'id_product');
    }
    public function table_order()
    {
        return $this->belongsTo(Table::class, 'id_table');
    }
    public function user_order()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
    use HasFactory;
    protected $table = 'order';
    protected $fillable = [
        'id','id_user','id_table','status','total','random_number', 'create_at'
    ];
    protected $dispatchesEvents =[
        'created' => OrderCreated::class,
        'updated' => OrderUpdated::class,
    ];
}
