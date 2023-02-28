<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\RegisterVerifyRequest;
use App\Http\Requests\Auth\ResendRegisterRequest;
use App\Models\OtpCode;
use App\Models\PageSetup;
use App\Models\PrescriptionSetting;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            $user = User::create(array_merge($request->validated(), ['otp_verified' => false, 'role' => User::ROLE['doctor']]));

            if ($user) {
                $otpCode = OtpCode::create([
                    'email'         => $request->input('email'),
                    'type'          => OtpCode::REGISTER_OTP_TYPE,
                    'code'          => (string) mt_rand(100000, 999999),
                    'validate_till' => now()->addHour(),
                ]);

                PageSetup::create([
                    'user_id' => $user->id,
                    'header_size' => PageSetup::SIZES['header_size'],
                    'patient_info_size' => PageSetup::SIZES['patient_info_size'],
                    'history_size' => PageSetup::SIZES['history_size'],
                    'footer_size' => PageSetup::SIZES['footer_size'],
                    'prescribe_size' => PageSetup::SIZES['prescribe_size'],
                ]);
                PrescriptionSetting::create(['user_id' => $user->id]);

                if ($otpCode) {
                    dispatch(new \App\Jobs\SendMailJob([
                        'email'  => $user->email,
                        'mailer' => new \App\Mail\OtpMail($otpCode),
                    ]));

                    Artisan::call('queue:work --stop-when-empty');

                    return $this->entityResponse([
                        'email'         => $request->input('email'),
                        'code'          => $otpCode->code,
                        'validate_till' => $otpCode->validate_till,
                    ], 201, 'success', 'Successfully registered...');
                }
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function verifyOtp(RegisterVerifyRequest $request)
    {
        try {
            $otpCode = OtpCode::select($this->primaryKey())->where([
                'code' => $request->input('code'),
                'email' => $request->input('email'),
                'type' => OtpCode::REGISTER_OTP_TYPE
            ])
                ->where('validate_till', '>', now())
                ->first();

            if (!$otpCode) {
                return $this->messageResponse('Verification otp not matched');
            }

            $user = User::where('email', $request->input('email'))->where('otp_verified', false)->first();
            if (!$user) {
                return $this->messageResponse('User already otp verified', 400);
            }
            $user->otp_verified = true;
            $user->update();
            $otpCode->delete();

            $accessToken = auth()->claims(array_merge($user->toArray(), ['remember_me' => $request->input('remember_me') ?? false]))->setTTL($request->input('remember_me') ? 60 * 60 : 30)->login($user);
            return $this->entityResponse(['token' => 'Bearer ' . $accessToken,], 200, 'success', 'OTP Verified Successfully');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function resendOtp(ResendRegisterRequest $request)
    {
        try {
            $user = User::where('email', $request->input('email'))->where('otp_verified', false)->first();
            if (!$user) {
                return $this->messageResponse('User already otp verified', 400);
            }

            OtpCode::where('email', $request->input('email'))->delete();
            $verifyOtp = OtpCode::create([
                'email'         => $user->email,
                'type'          => OtpCode::REGISTER_OTP_TYPE,
                'code'          => (string) mt_rand(100000, 999999),
                'validate_till' => now()->addHour(),
            ]);

            if ($verifyOtp) {
                dispatch(new \App\Jobs\SendMailJob([
                    'email'  => $user->email,
                    'mailer' => new \App\Mail\OtpMail($verifyOtp),
                ]));

                Artisan::call('queue:work --stop-when-empty');

                return $this->entityResponse([
                    'email' => $user->email,
                    'validate_till' => $verifyOtp->validate_till,
                    'code' => $verifyOtp->code
                ], 201, 'success', 'Successfully resend register otp');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
