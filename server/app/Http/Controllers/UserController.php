<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserModel;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getListUsers() {
        $users = User::all();
        return response(["users"=>$users]);
    }

    public function getUser($id) {
        $user = User::find($id);
        return response(["user"=>$user]);
    }

    public function createUser (Request $req){
        $data = $req->validate([
            "name" => "required",
            "email" => "required",
            "password" => "required",
        ]);
        $user = User::create($data);
        return response([
            "message" => $user->name." created successfully"
        ]);
    }

    public function deleteUser ($id){
        $user = User::find($id);
        if(!$user) {
            return response(["error" => true, "message" => "User not found"]);
        }
        $user->delete();
        return response(["error" => false, "message" => "Delete user successfully"]);
    }

    public function updateUser(Request $req, $id){
        $user = User::find($id);
        if(!$user) return response(["error" => true, "message" => "User not found"]);
        $user->update($req->all());
        return response(["error" => false, "message" => "Update successful"]);
    }
}
