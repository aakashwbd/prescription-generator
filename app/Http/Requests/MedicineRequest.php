<?php

namespace App\Http\Requests;

use App\Traits\Helper;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class MedicineRequest extends FormRequest
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
            'name' => 'required',
            'medicine_type_id' => 'required',
            'pregnancy_category_id' => 'sometimes',
            'manufacturer_id' => 'sometimes',
            'generic_id' => 'sometimes',
            'therapeutic_class_id' => 'sometimes',
            'strength_id' => 'sometimes',
            'adult_dose' => 'sometimes',
            'child_dose' => 'sometimes',
            'renal_dose' => 'sometimes',
            'administration' => 'sometimes',
            'indication' => 'sometimes',
            'contraindication' => 'sometimes',
            'side_effect' => 'sometimes',
            'interaction' => 'sometimes',
            'package_prices' => 'sometimes|array',
            'status' => 'required|'.Rule::in(['active', 'inactive'])
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
