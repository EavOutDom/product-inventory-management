<?php

namespace App\Http\Controllers;

use App\Models\ProductModel;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getListProducts() {
        $products = ProductModel::all();
        return response(["products"=>$products]);
    }
}