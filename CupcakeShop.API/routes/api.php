<?php

use App\Http\Controllers\{
    AuthController,
    CartController,
    CheckoutController,
    CupcakeController,
    DashboardController,
    MeController,
};
use App\Http\Controllers\Admin\RequestController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('/auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::prefix('/cupcakes')->group(function () {
    Route::get('/', [CupcakeController::class, 'index']);
    Route::get('/{cupcake}', [CupcakeController::class, 'show']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [MeController::class, 'me']);
        Route::put('/me', [MeController::class, 'update']);
    });

    Route::prefix('/cupcakes')->group(function () {
        Route::post('/', [CupcakeController::class, 'store']);
        Route::put('/{cupcake}', [CupcakeController::class, 'update']);
        Route::delete('/{cupcake}', [CupcakeController::class, 'destroy']);
        
        Route::prefix('/{cupcake}/cart')->group(function () {
            Route::post('/', [CartController::class, 'addItemCart']);
            Route::delete('/', [CartController::class, 'removeFromCart']);
            Route::post('/increase', [CartController::class, 'increaseQuantity']);
            Route::post('/decrease', [CartController::class, 'decreaseQuantity']);
        });
    });

    Route::get('/cart', [CartController::class, 'index']);

    Route::prefix('/checkout')->group(function () {
        Route::get('/', [CheckoutController::class, 'index']);
        Route::post('/', [CheckoutController::class, 'checkout']);
        Route::post('/{checkout}/cancel', [CheckoutController::class, 'cancelCheckout']);
        Route::get('/{checkout}', [CheckoutController::class, 'show']);
    });

    Route::get('/dashboard', [DashboardController::class, 'getCount']);

    Route::prefix('/users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::delete('/{user}', [UserController::class, 'destroy']);
    })
;
    Route::get('/requests', [RequestController::class, 'index']);
});
