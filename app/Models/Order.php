<?php

namespace App\Models;

use App\Events\OrderCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public function table_order()
    {
        return $this->belongsTo(Table::class, 'id_table');
    }
    use HasFactory;
    protected $table = 'order';
    protected $fillable = [
        'id','id_user','id_table','status','total','random_number'
    ];
    protected $dispatchesEvents =[
        'created' => OrderCreated::class,
    ];
}
