<?php

namespace App\Services;

use manager\app\Constants\HttpStatuses;
use manager\app\Http\Requests\GuestRequest;
use manager\app\Http\Requests\LoginRequest;
use manager\app\Http\Requests\RegisterRequest;
use manager\app\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthService
{
    public function register(RegisterRequest $data): array
    {
        $user = User::create([
            'name' => $data->name,
            'email' => $data->email,
            'password' => Hash::make($data->password),
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        Log::info("User with email $data->email registered successfully.");

        return [
            'user' => $user,
            'token' => $token,
            'message' => 'Registration successful. Please check your email to verify your account.',
        ];
    }

    public function login(LoginRequest $credentials): array
    {
        $user = User::where('email', $credentials->email)->first();

        if (!$user || !Hash::check($credentials->password, $user->password)) {
            Log::error("No user found by email $credentials->email.");
            throw new HttpResponseException(
                response()->json([
                    'message' => 'Invalid credentials',
                ], HttpStatuses::HTTP_UNAUTHORIZED)
            );
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
        ];
    }

    public function guest(GuestRequest $guestRequest): array
    {
        if ($guestRequest->guest_id == null) {
            $guest_id = 'guest_' . uniqid();
            $user = User::create([
                'name' => 'Guest',
                'email' => 'Guest' . $guest_id . '@email.com',
                'password' => Hash::make($guest_id),
                'guest_id' => $guest_id,
            ]);
            Log::info($user);

            return [
                'user' => $user,
            ];
        }

        $user = User::where('guest_id', $guestRequest->guest_id)->first();

        return [
            'user' => $user,
        ];
    }

    public function logout(Request $request): void
    {
        $request->user()->currentAccessToken()->delete();
    }
}
