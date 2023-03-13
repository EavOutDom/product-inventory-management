<?php

namespace App\Http\Controllers;

use App\Models\SupplierModel;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function getListSuppliers() {
        $suppliers = SupplierModel::all();
        return response(["suppliers"=>$suppliers]);
    }

    public function getSupplier($id) {
        $supplier = SupplierModel::find($id);
        return response(["supplier"=>$supplier]);
    }

    public function createSupplier (Request $req){
        $data = $req->validate([
            "name" => "required",
            "address" => "required",
            "telephone" => "required",
            "email" => "nullable",
        ]);
        $supplier = SupplierModel::create($data);
        return response([
            "message" => $supplier->name." created successfully"
        ]);
    }

    public function deleteSupplier ($id){
        $supplier = SupplierModel::find($id);
        if(!$supplier) {
            return response(["error" => true, "message" => "Supplier not found"]);
        }
        $supplier->delete();
        return response(["error" => false, "message" => "Delete supplier successfully"]);
    }

    public function updateSupplier(Request $req, $id){
        $supplier = SupplierModel::find($id);
        if(!$supplier) return response(["error" => true, "message" => "Supplier not found"]);
        $supplier->update($req->all());
        return response(["error" => false, "message" => "Update successful"]);

    }
}
