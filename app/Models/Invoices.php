<?php

namespace App\Models;

use App\Events\InvoicesCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoices extends Model
{
    public function product_invoices(){
        return $this->hasMany(ProductInvoices::class, 'id_invoices');
    }
    public function invoices_order()
    {
        return $this->belongsTo(Order::class, 'id_order');
    }
    use HasFactory;
    protected $table = 'invoices';
    protected $fillable = [
    'id',
    'id_user',
    'id_table',
    'id_order',
    'total',
    'created_at'
    ];
    protected $dispatchesEvents =[
        'created' => InvoicesCreated::class,
    ];
}
