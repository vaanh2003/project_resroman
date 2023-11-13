<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductInvoices extends Model
{
    public function product_invoices(){
        return $this->belongsTo(Invoices::class, 'id_invoices');
    }
    public function product_product(){
        return $this->belongsTo(Product::class, 'id_product');
    }
    use HasFactory;
    protected $table = 'product_invoices';
    protected $fillable = [
        'id','id_invoices','id_product','amount'
    ];
}
