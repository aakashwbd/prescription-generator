<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Http\Requests\Auth\ResetConfirmRequest;
use App\Http\Requests\Auth\ResetRequest;
use App\Http\Requests\Auth\ResetVerifyRequest;
use App\Models\OtpCode;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ResetController extends Controller
{
    public function resetRequest(ResetRequest $request)
    {
        try {
            OtpCode::where(['email' => $request->input('email'), 'type' => OtpCode::RESET_OTP_TYPE])->delete();

            $verifyOtp = OtpCode::create([
                'email'         => $request->input('email'),
                'type'          => OtpCode::RESET_OTP_TYPE,
                'code'          => (string) mt_rand(100000, 999999),
                'validate_till' => now()->addHour(),
                'verify_status' => false,
            ]);

            dispatch(new \App\Jobs\SendMailJob([
                'email'  => $verifyOtp->email,
                'mailer' => new \App\Mail\OtpMail($verifyOtp),
            ]));

            Artisan::call('queue:work --stop-when-empty');

            return $this->entityResponse([
                'email'         => $request->input('email'),
                'code'          => $verifyOtp->code,
                'validate_till' => $verifyOtp->validate_till,
            ], 201, 'success', 'Password reset request added successfully...');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function verifyOtp(ResetVerifyRequest $request)
    {
        try {
            $verifyOtp = OtpCode::where([
                'email' => $request->input('email'),
                'code' => $request->input('code'),
                'type' => OtpCode::RESET_OTP_TYPE,
                'verify_status' => false
            ])
                ->where('validate_till', '>', now())
                ->first();

            if (!$verifyOtp) {
                return $this->messageResponse('Verification otp not matched');
            }

            $verifyOtp->verify_status = true;
            $verifyOtp->update();

            return $this->entityResponse(['email' => request('email')], 200, 'success', 'Password reset otp verified');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function resetConfirm(ResetConfirmRequest $request)
    {
        try {
            $verifyOtp = OtpCode::where([
                'email' => $request->input('email'),
                'type' => OtpCode::RESET_OTP_TYPE,
                'verify_status' => true,
            ])
                ->where('validate_till', '>', now())
                ->first();

            if (!$verifyOtp) {
                return $this->messageResponse('This user has no password reset request');
            }

            User::where('email', request('email'))->update(['password' => Hash::make(request('password'))]);
            $verifyOtp->delete();

            return $this->messageResponse('Password changed successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        try {
            if(!Hash::check($request->input('current_password'), auth()->user()->password)){
                return $this->validateError([
                    'current_password' => ['Current password not matched...'],
                ], true);
            }
            auth()->user()->update(['password' => request('password')]);
            (new LoginController())->logout();
            return $this->messageResponse('Password changed successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
