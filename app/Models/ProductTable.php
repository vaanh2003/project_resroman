<?php

namespace App\Models;

use App\Events\ProductTableCreated;
use App\Events\ProductTableDeleted;
use App\Events\ProductTableUpdated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductTable extends Model
{
    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product');
    }
    use HasFactory;
    protected $table ='product_table';
    protected $fillable = ['id','id_table','id_product','amount'];
    protected $dispatchesEvents = [
        'created' => ProductTableCreated::class,
        'updated' => ProductTableUpdated::class,
        'deleted' => ProductTableDeleted::class,
    ];
}
