<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post("/auth/login", [AuthController::class, "login"]);

Route::middleware('auth:sanctum')->group(function () {

    Route::get("/product/getListProducts", [ProductController::class, "getListProducts"]);
    Route::get("/product/getProduct/{id}", [ProductController::class, "getProduct"]);
    Route::post("/product/createProduct", [ProductController::class, "createProduct"]);
    Route::delete("/product/deleteProduct/{id}", [ProductController::class, "deleteProduct"]);
    Route::put("/product/updateProduct/{id}", [ProductController::class, "updateProduct"]);

});