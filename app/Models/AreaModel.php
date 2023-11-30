<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AreaModel extends Model
{
    public function table_area(){
        return $this->hasMany(Table::class, 'id_area');
    }
    use HasFactory;
    protected $table = 'area';
    protected $fillable = [
        'id', 'name', 'status'
    ];
}
