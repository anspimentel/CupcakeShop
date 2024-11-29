<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\Auth\{
    LoginRequest,
    RegisterRequest,
};
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'zipcode' => $validated['zipcode'],
            'street' => $validated['street'],
            'number' => $validated['number'],
            'neighborhood' => $validated['neighborhood'],
            'state' => $validated['state'],
            'city' => $validated['city'],
            'phone' => $validated['phone'],
            'password' => $validated['password'],
        ]);

        return response()->json([
            'message' => 'User created successfully!',
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        $isValidLogin = $user && Hash::check($validated['password'], $user->password);

        if (!$isValidLogin) {
            return response()->json([
                'message' => 'Credenciais inválidas.'
            ], 401);
        }

        $token = $user->createToken('api')->plainTextToken;

        return response()->json([
            'token' => $token,
            'role' => $user->role
        ], 200);
    }
}
