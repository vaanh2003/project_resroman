<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    public function table_order(){
        return $this->hasMany(Order::class, 'id_table');
    }
    use HasFactory;
    protected $table = "table";
    protected $fillable = ['id','id_area','name','status'];
}
