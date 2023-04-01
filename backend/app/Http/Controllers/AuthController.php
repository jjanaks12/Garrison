<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordRequest;
use App\Http\Requests\UserRequest;
use App\Mail\PasswordResetMail;
use App\Mail\UserRegister;
use App\Mail\UserUpdate;
use App\Models\Media;
use App\Models\PasswordReset;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $attr = $request->validate([
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed'
        ]);

        $user = User::create([
            'password' => bcrypt($attr['password']),
            'email' => $attr['email']
        ]);

        Mail::to($attr['email'])->send(new UserRegister($user));

        return response()->json([
            'status' => 'Success',
            'data' => [
                'token' => $user->createToken('API Token')->plainTextToken
            ]
        ], 200);
    }

    public function login(Request $request)
    {
        $attr = $request->validate([
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) {
            return response()->json([
                'status' => 'Error',
                'message' => 'Credentials did not match',
                'data' => null
            ], 401);
        }

        if (count(Auth::user()->roles) == 0) {
            $staffRole = Role::where('title', '=', 'Staff')->first();

            if ($staffRole)
                Auth::user()->roles()->attach($staffRole);
        }

        return response()->json([
            'status' => 'Success',
            'data' => [
                'token' => Auth::user()->createToken('API Token')->plainTextToken
            ]
        ], 200);
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();

        return [
            'message' => 'Tokens Revoked'
        ];
    }

    public function authUser()
    {
        $user = User::find(Auth::user()->id);

        return response()->json([
            'user' => $user,
            'role' => $user->roles->first(),
            'avatar' => $user->media
        ], 200);
    }

    public function changePassword(PasswordRequest $request)
    {
        $user = User::find(Auth::user()->id);

        $user->password = bcrypt($request->get('password'));
        $user->save();

        return response()->json($user, 200);
    }

    public function changeDetail(UserRequest $request)
    {
        $user = User::find(Auth::user()->id);

        if ($request->get('file')) {
            $media = new Media();
            $media->path = $this->uploadImage($request->get('file'));
            $media->description = $request->get('name');
            $media->save();

            $user->media_id = $media->id;
        }

        $user->name = $request->get('name');
        $user->address = $request->get('address');
        $user->phone = $request->get('phone');
        $user->save();

        Mail::to($user->email)->send(new UserUpdate($user));

        return response()->json($user, 200);
    }

    public function uploadImage($image)
    {
        preg_match("/data:image\/(.*?);/", $image, $image_extension); // extract the image extension
        $image = preg_replace('/data:image\/(.*?);base64,/', '', $image); // remove the type part
        $image = str_replace(' ', '+', $image);
        $imageName = time() . '.' . $image_extension[1]; //generating unique file name;
        Storage::disk('public')->put($imageName, base64_decode($image));

        return $imageName;
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->only('email'), [
            'email' => "required|email"
        ]);

        if ($validator->fails()) {
            return response([
                'status' => 'Error',
                'message' => $validator->errors()->first(),
                'data' => null
            ], 402);
        }

        $user = User::where('email', $request->get('email'))->first();

        if (!$user)
            return response()->json([
                'status' => 'Error',
                'message' => 'email does not exists',
                'data' => null
            ], 422);

        $token = bcrypt(Str::random(60));

        PasswordReset::where('email', $request->get('email'))->delete();
        $passwordReset = new PasswordReset();
        $passwordReset->email = $request->get('email');
        $passwordReset->token = $token;
        $passwordReset->save();

        Mail::to($request->get('email'))->send(new PasswordResetMail($passwordReset, $user, $request->get('host')));

        return response()->json([
            'status' => 'Success',
            'message' => "Mail send successfully",
            'data' => null
        ], 200);
    }

    public function resetPassword(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required|string|min:6|confirmed',
            'token' => 'required|string|min:60'
        ]);

        if ($validation->fails())
            return response()->json([
                'status' => 'Error',
                'message' => $validation->errors()->first(),
                'data' => null
            ], 422);

        $resetEmail = PasswordReset::where('email', $request->get('email'))->first();

        if (!$resetEmail)
            return response()->json([
                'status' => 'Error',
                'message' => 'Looks like you have already done reset password',
                'data' => null
            ], 422);

        if ($request->get('token') !== $resetEmail->token)
            return response()->json([
                'status' => 'Error',
                'message' => 'failed to change password, Token did not matched',
                'data' => null
            ], 422);

        $user = User::where('email', $request->get('email'))->first();
        $user->password = bcrypt($request->get('password'));
        $user->save();

        $resetEmail->delete();

        return response()->json([
            'status' => 'Success',
            'message' => "Password changed successfully",
            'data' => null
        ], 200);
    }
}
