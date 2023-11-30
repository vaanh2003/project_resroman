<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    public function table_order(){
        return $this->hasMany(Order::class, 'id_table');
    }
    public function table_area(){
        return $this->belongsTo(AreaModel::class,'id_area');
    }
    use HasFactory;
    protected $table = "table";
    protected $fillable = ['id','id_area','name','status'];
}
