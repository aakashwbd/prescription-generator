<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\OtpCode;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        try {
            $user = User::where('email', $request->input('email'))->first();
            if(!$user){
                return $this->messageResponse('Sorry, User not found');
            }

            if (!Hash::check($request->input('password'), $user->password)) {
                return $this->messageResponse('Credentials not matched', 400);
            }

            if (!$user->otp_verified) {
                OtpCode::where([
                    'email' => $request->input('email'),
                    'type'  => OtpCode::REGISTER_OTP_TYPE
                ])->delete();

                $otpCode = OtpCode::create([
                    'email'         => $request->input('email'),
                    'type'          => OtpCode::REGISTER_OTP_TYPE,
                    'code'          => (string) mt_rand(100000, 999999),
                    'validate_till' => now()->addHour(),
                ]);

                if ($otpCode) {
                    dispatch(new \App\Jobs\SendMailJob([
                        'email'  => $request->input('email'),
                        'mailer' => new \App\Mail\OtpMail($otpCode),
                    ]));

                    Artisan::call('queue:work --stop-when-empty');

                    return $this->entityResponse([
                        'email'         => $request->input('email'),
                        'code'          => $otpCode->code,
                        'validate_till' => $otpCode->validate_till,
                    ], 400, 'error', 'Account is not verified, Please verify your account');
                }
            }

            $token = auth()->claims(array_merge($user->toArray(), ['remember_me' => $request->input('remember_me')]))
                ->setTTL(request('remember_me') ? 60 * 60 : 30)
                ->attempt(['email' => $request->input('email'), 'password' => $request->input('password')]);

            return $this->entityResponse(['token'    => 'Bearer ' . $token], 200, 'success', 'Successfully logged in...');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function refresh()
    {
        if(!auth()->check()){
            return $this->messageResponse('Token has expired');
        }
        return $this->entityResponse(['token'    => 'Bearer ' . auth()->setTTL($this->jwtDecode()->remember_me ? 60 * 60 : 30)->refresh()]);
    }

    public function logout()
    {
        try {
            if(!auth()->check()){
                return $this->messageResponse('Token has expired');
            }

            auth()->logout();
            return $this->messageResponse('Successfully logout...', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
