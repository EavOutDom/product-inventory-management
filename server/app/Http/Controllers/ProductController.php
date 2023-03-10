<?php

namespace App\Http\Controllers;

use App\Models\CategoryModel;
use App\Models\CustomerModel;
use App\Models\ProductModel;
use App\Models\SupplierModel;
use App\Models\User;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index () {
        $products = ProductModel::count();
        $categories = CategoryModel::count();
        $customers = CustomerModel::count();
        $suppliers = SupplierModel::count();
        $users = User::count();
        return response([
            "products" => $products,
            "categories" => $categories,
            "customers" => $customers,
            "suppliers" => $suppliers,
            "users" => $users
        ]);
    }

    public function getListProducts() {
        $products = ProductModel::with("getCategory")->get();
        $listCategories = CategoryModel::all();
        return response(["products"=>$products, "categories"=>$listCategories]);
    }

    public function getProduct($id) {
        $product = ProductModel::find($id);
        return response(["product"=>$product]);
    }

    public function createProduct (Request $req){
        $data = $req->validate([
            "name" => "required",
            "category_id" => "required",
            "product_qty" => "required",
            "unit_price" => "required",
            "discount" => "nullable",
            "start_discount" => "nullable",
            "end_discount" => "nullable"
        ]);
        $product = ProductModel::create($data);
        return response([
            "message" => $product->name." created successfully"
        ]);
    }

    public function deleteProduct ($id){
        $product = ProductModel::find($id);
        if(!$product) {
            return response(["error" => true, "message" => "Product not found"]);
        }
        $product->delete();
        return response(["error" => false, "message" => "Delete product successfully"]);
    }

    public function updateProduct(Request $req, $id){
        $product = ProductModel::find($id);
        if(!$product) return response(["error" => true, "message" => "Product not found"]);
        $product->update($req->all());
        return response(["error" => false, "message" => "Update successful"]);

    }
}
