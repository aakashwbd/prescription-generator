<?php

namespace App\Http\Requests;

use App\Traits\Helper;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class PageSetupRequest extends FormRequest
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
            'header_size' => 'sometimes|array',
            'header_size.height' => 'required',
            'header_size.width' => 'required',

            'patient_info_size' => 'sometimes|array',
            'patient_info_size.height' => 'required',
            'patient_info_size.width' => 'required',

            'history_size' => 'sometimes|array',
            'history_size.height' => 'required',
            'history_size.width' => 'required',

            'footer_size' => 'sometimes|array',
            'footer_size.height' => 'required',
            'footer_size.width' => 'required',

            'prescribe_size' => 'sometimes|array',
            'prescribe_size.height' => 'required',
            'prescribe_size.width' => 'required',

            'prescription_size' => 'sometimes|array',
            'prescription_size.height' => 'required',
            'prescription_size.width' => 'required',

            'header_left_content' => 'sometimes',
            'header_right_content' => 'sometimes',
            'header_bg_color' => 'sometimes',
            'header_barcode_display' => 'sometimes|boolean',
            'footer_content' => 'sometimes',
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
