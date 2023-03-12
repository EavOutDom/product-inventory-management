<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductModel extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $guarded = ["id"];

    public function getCategory () {
        return $this->belongsTo(CategoryModel::class, "category_id")->select(["id", "name"]);
    }
}
