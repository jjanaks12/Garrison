<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/auth/register', [App\Http\Controllers\AuthController::class, 'register']);
Route::post('/auth/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('/auth/forgot_password', [App\Http\Controllers\AuthController::class, 'forgotPassword']);
Route::put('/auth/reset_password', [App\Http\Controllers\AuthController::class, 'resetPassword']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/abilities', [App\Http\Controllers\AbilitiesController::class, 'index']);

    //= Auth
    Route::get('/me', [App\Http\Controllers\AuthController::class, 'authUser']);
    Route::put('/auth/change_password', [App\Http\Controllers\AuthController::class, 'changePassword']);
    Route::put('/auth/change_detail', [App\Http\Controllers\AuthController::class, 'changeDetail']);

    //= Permission
    Route::resource('permissions', App\Http\Controllers\PermissionController::class);

    //= Roles
    Route::resource('roles', App\Http\Controllers\RoleController::class);
    Route::put('roles/{role}/assign_permissions', [App\Http\Controllers\RoleController::class, 'assignPermission']);

    //= Users
    Route::put('user/{user}/assign_role/{role}', [App\Http\Controllers\UserController::class, 'assignRole']);
    Route::get('user/report', [App\Http\Controllers\UserController::class, 'report']);
    
    Route::post('/auth/logout', [App\Http\Controllers\AuthController::class, 'logout']);

    //= Attendance
    Route::get("user/today_attendance", [App\Http\Controllers\AttendanceController::class, 'todayAttendance']);
    Route::post("user/attendance", [App\Http\Controllers\AttendanceController::class, 'create']);
    Route::get("attendances", [App\Http\Controllers\AttendanceController::class, 'index']);
});
Route::get('users', [App\Http\Controllers\UserController::class, 'index']);
