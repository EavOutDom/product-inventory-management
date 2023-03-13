<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
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

    Route::get("/dashboard", [ProductController::class, "index"]);

    Route::get("/product/getListProducts", [ProductController::class, "getListProducts"]);
    Route::get("/product/getProduct/{id}", [ProductController::class, "getProduct"]);
    Route::post("/product/createProduct", [ProductController::class, "createProduct"]);
    Route::delete("/product/deleteProduct/{id}", [ProductController::class, "deleteProduct"]);
    Route::put("/product/updateProduct/{id}", [ProductController::class, "updateProduct"]);

    Route::get("/category/getListCategories", [CategoryController::class, "getListCategories"]);
    Route::get("/category/getCategory/{id}", [CategoryController::class, "getCategory"]);
    Route::post("/category/createCategory", [CategoryController::class, "createCategory"]);
    Route::delete("/category/deleteCategory/{id}", [CategoryController::class, "deleteCategory"]);
    Route::put("/category/updateCategory/{id}", [CategoryController::class, "updateCategory"]);

    Route::get("/customer/getListCustomers", [CustomerController::class, "getListCustomers"]);
    Route::get("/customer/getCustomer/{id}", [CustomerController::class, "getCustomer"]);
    Route::post("/customer/createCustomer", [CustomerController::class, "createCustomer"]);
    Route::delete("/customer/deleteCustomer/{id}", [CustomerController::class, "deleteCustomer"]);
    Route::put("/customer/updateCustomer/{id}", [CustomerController::class, "updateCustomer"]);

    Route::get("/supplier/getListSuppliers", [SupplierController::class, "getListSuppliers"]);
    Route::get("/supplier/getSupplier/{id}", [SupplierController::class, "getSupplier"]);
    Route::post("/supplier/createSupplier", [SupplierController::class, "createSupplier"]);
    Route::delete("/supplier/deleteSupplier/{id}", [SupplierController::class, "deleteSupplier"]);
    Route::put("/supplier/updateSupplier/{id}", [SupplierController::class, "updateSupplier"]);
});
