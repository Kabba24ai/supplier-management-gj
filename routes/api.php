<?php

use App\Http\Controllers\SupplierController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// API Routes for Suppliers
Route::prefix('suppliers')->group(function () {
    Route::get('/', [SupplierController::class, 'index']);
    Route::post('/', [SupplierController::class, 'store']);
    Route::get('/stats', [SupplierController::class, 'stats']);
    Route::get('/categories', [SupplierController::class, 'categories']);
    Route::get('/{supplier}', [SupplierController::class, 'show']);
    Route::put('/{supplier}', [SupplierController::class, 'update']);
    Route::delete('/{supplier}', [SupplierController::class, 'destroy']);
});