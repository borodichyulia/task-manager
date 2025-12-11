<?php

namespace App\Http\Controllers;

use manager\app\Constants\HttpStatuses;
use manager\app\Http\Requests\GuestRequest;
use manager\app\Http\Requests\LoginRequest;
use manager\app\Http\Requests\RegisterRequest;
use manager\app\Services\AuthService;
use backuse Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    private AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request): Response
    {
        $result = $this->authService->register($request);

        return response($result, HttpStatuses::HTTP_CREATED);
    }

    public function login(LoginRequest $request): Response
    {
        $result = $this->authService->login($request);

        return response($result, HttpStatuses::HTTP_OK);
    }

    public function guest(GuestRequest $guestRequest): Response
    {
        $result = $this->authService->guest($guestRequest);

        return response($result, HttpStatuses::HTTP_OK);
    }

    public function logout(Request $request): Response
    {
        $this->authService->logout($request);

        return response()->json(['message' => 'Logged out successfully',], HttpStatuses::HTTP_OK);
    }
}
