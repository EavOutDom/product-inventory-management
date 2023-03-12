<?php

namespace App\Http\Controllers;

use App\Models\CategoryModel;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getListCategories() {
        $categories = CategoryModel::all();
        return response(["category"=>$categories]);
    }

    public function getCategory($id) {
        $category = CategoryModel::find($id);
        return response(["category"=>$category]);
    }

    public function createCategory (Request $req){
        $data = $req->validate([
            "name" => "required",
        ]);
        $category = CategoryModel::create($data);
        return response([
            "message" => $category->name." created successfully"
        ]);
    }

    public function deleteCategory ($id){
        $category = CategoryModel::find($id);
        if(!$category) {
            return response(["error" => true, "message" => "Product not found"]);
        }
        $category->delete();
        return response(["error" => false, "message" => "Delete product successfully"]);
    }

    public function updateCategory(Request $req, $id){
        $category = CategoryModel::find($id);
        if(!$category) return response(["error" => true, "message" => "Product not found"]);
        $category->update($req->all());
        return response(["error" => false, "message" => "Update successful"]);
    }
}
