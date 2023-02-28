<?php

namespace App\Http\Requests\Auth;

use App\Traits\Helper;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    use Helper;
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'                  => 'required',
            'phone'                 => 'sometimes|regex:/(01[3-9]\d{8})$/|unique:users',
            'email'                 => 'required|email:rfc,dns|unique:users',
            'password'              => 'required|min:6|confirmed',
            'doctor_type'           => 'sometimes|' . Rule::in(['MBBS', 'BDS']),
            'institute'             => 'sometimes',
            'current_practice_area' => 'sometimes',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        if ($this->wantsJson() || $this->ajax()) {
            throw new HttpResponseException($this->validateError($validator->errors()));
        }
        parent::failedValidation($validator);
    }
}
