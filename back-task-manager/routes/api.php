<?php

use manager\app\Http\Controllers\AuthController;
use App\Http\Controllers\Guest\GuestController;
use manager\app\Http\Controllers\TaskController;
use manager\app\Http\Controllers\TaskGuestController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('guest', [AuthController::class, 'guest']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
    });

    Route::apiResource('tasks', TaskController::class);
});

Route::prefix('guest')->group(function () {
    Route::apiResource('tasks', TaskGuestController::class);
    Route::post('/session', [GuestController::class, 'storeSession']);
    Route::get('/session/{guestId}', [GuestController::class, 'getSession']);
});
