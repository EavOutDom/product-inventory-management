<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseModel extends Model
{
    use HasFactory;
    protected $table = "purchase_product";
    protected $guarded = ["id"];

    public function getProduct() {
        return $this->belongsTo(ProductModel::class, "product_id")->select("id", "name");
    }

    public function getSupplier () {
        return $this->belongsTo(SupplierModel::class, "supplier_id")->select("id", "name");
    }
}
