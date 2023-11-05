<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductInvoices extends Model
{
    use HasFactory;
    protected $table = 'product_invoices';
    protected $fillable = [
        'id','id_invoices','id_product','amount'
    ];
}
