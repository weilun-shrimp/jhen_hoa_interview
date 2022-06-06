<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostCatController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('test', function() {return 'test';});

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('refresh', [AuthController::class, 'refresh'])->name('refresh');
    Route::post('me', [AuthController::class, 'me'])->name('me');
});

Route::group(['middleware' => 'auth:api'], function () {
    Route::name('post')->prefix('post')->group(function () {
        Route::get('/', [PostController::class, 'index'])->name('index');
        Route::get('/{id}', [PostController::class, 'show'])->name('show')->where('id', '[0-9]+');;
        Route::post('/', [PostController::class, 'store'])->name('store');
        Route::get('/create', [PostController::class, 'create'])->name('create');
        Route::get('/edit/{post}', [PostController::class, 'edit'])->name('edit');
        Route::put('/{id}', [PostController::class, 'update'])->name('update');
    });

    Route::name('post_cat')->prefix('post_cat')->group(function () {
        Route::get('/', [PostCatController::class, 'index'])->name('index');
        Route::post('/', [PostCatController::class, 'store'])->name('store');
        Route::put('/{cat_id}', [PostCatController::class, 'update'])->name('update');
        Route::delete('/{cat_id}', [PostCatController::class, 'delete'])->name('delete');
    });
});
