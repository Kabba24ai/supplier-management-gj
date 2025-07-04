<?php

use App\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('suppliers.index');
});

Route::resource('suppliers', SupplierController::class);
Route::get('/api/suppliers/stats', [SupplierController::class, 'stats'])->name('suppliers.stats');
Route::get('/api/suppliers/categories', [SupplierController::class, 'categories'])->name('suppliers.categories');