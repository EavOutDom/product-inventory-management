<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login (Request $req) {
        if(!$req->email && !$req->password){
            return response(["error" => true, "message" => "email and password are required!"]);
        }
        $user = User::where("email", $req->email)->first();
        if($user){
            // $check_password = Hash::check($user->password, $req->password);
            if($user->password == $req->password){
                $access_token = $user->createToken('authToken')->plainTextToken;
                return response(["user" => $user, "access_token" => $access_token]);
            }
            return response(["error" => true, "message" => "Incorrect password!"]);
        }
        return response(["error" => true, "message" => "User not found!"]);
    }
}