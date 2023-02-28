<?php

namespace App\Http\Requests;

use App\Traits\Helper;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class PrescriptionSettingRequest extends FormRequest
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
            'font_size' => 'sometimes|numeric',
            'line_per_page' => 'sometimes|numeric',
            'visit_fee' => 'sometimes|numeric',
            're_visit_fee' => 'sometimes|numeric',
            're_visit_validity' => 'sometimes|numeric',
            'default_revisit_count' => 'sometimes',
            'barcode_display' => 'sometimes|boolean',
            'barcode_position' => 'sometimes|'.Rule::in(['left', 'right']),
            'multiple_page_print' => 'sometimes|boolean',
            'visit_no_display' => 'sometimes|boolean',
            'patient_info' => 'sometimes|boolean',
            'name_display' => 'sometimes|boolean',
            'age_display' => 'sometimes|boolean',
            'gender_display' => 'sometimes|boolean',
            'weight_display' => 'sometimes|boolean',
            'date_display' => 'sometimes|boolean',
            'address_display' => 'sometimes|boolean',
            'registration_no_display' => 'sometimes|boolean',
            'mobile_display' => 'sometimes|boolean',
            'cubic_centimeter_display' => 'sometimes|boolean',
            'on_examination_display' => 'sometimes|boolean',
            'advice_display' => 'sometimes|boolean',
            'disease_display' => 'sometimes|boolean',
            'footer_display' => 'sometimes|boolean',
            'print_past_history' => 'sometimes|boolean',
            'print_present_history' => 'sometimes|boolean',
            'print_notes' => 'sometimes|boolean',
            'print_edd' => 'sometimes|boolean',
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
