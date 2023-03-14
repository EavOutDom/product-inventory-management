<?php

namespace App\Http\Controllers;

use App\Models\ProductModel;
use App\Models\PurchaseModel;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    public function getListPurchaseProducts() {
        $purchases = PurchaseModel::with("getProduct", "getSupplier")->get();
        return response(["purchase_products"=>$purchases]);
    }

    public function createPurchaseProduct(Request $req) {
        $data = $req->validate([
            "product_id" => "required",
            "supplier_id" => "required",
            "product_qty" => "required",
            "in_date" => "required",
        ]);
        $product = ProductModel::find($data);
        return response([
            "message"=>$data
        ]);
    }
}
