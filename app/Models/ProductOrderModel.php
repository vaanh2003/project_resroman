<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductOrderModel extends Model
{
    use HasFactory;
    protected $table = 'product_order';
    protected $fillable = [
        'id' , 'id_product' , 'id_order' , 'amount'
    ];
}
