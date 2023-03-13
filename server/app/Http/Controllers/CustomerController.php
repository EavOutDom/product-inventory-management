<?php

namespace App\Http\Controllers;

use App\Models\CustomerModel;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function getListCustomers() {
        $customers = CustomerModel::all();
        return response(["customers"=>$customers]);
    }

    public function getCustomer($id) {
        $customer = CustomerModel::find($id);
        return response(["customer"=>$customer]);
    }

    public function createCustomer (Request $req){
        $data = $req->validate([
            "name" => "required",
            "address" => "required",
            "telephone" => "required",
            "email" => "nullable",
        ]);
        $customer = CustomerModel::create($data);
        return response([
            "message" => $customer->name." created successfully"
        ]);
    }

    public function deleteCustomer ($id){
        $customer = CustomerModel::find($id);
        if(!$customer) {
            return response(["error" => true, "message" => "Customer not found"]);
        }
        $customer->delete();
        return response(["error" => false, "message" => "Delete customer successfully"]);
    }

    public function updateCustomer(Request $req, $id){
        $customer = CustomerModel::find($id);
        if(!$customer) return response(["error" => true, "message" => "Customer not found"]);
        $customer->update($req->all());
        return response(["error" => false, "message" => "Update successful"]);

    }
}
