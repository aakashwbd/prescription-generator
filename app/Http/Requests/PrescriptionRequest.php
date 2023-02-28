<?php

namespace App\Http\Requests;

use App\Traits\Helper;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class PrescriptionRequest extends FormRequest
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
            'appoint_no'=> 'sometimes',
            'name' => 'sometimes',
            'age' => 'sometimes|numeric',
            'gender' => 'sometimes|'.Rule::in(['Male', 'Female', 'Other']),
            'address' => 'sometimes',
//            'mobile' => 'sometimes|regex:/(01[3-9]\d{8})$/',
            'mobile' => 'sometimes',
            'registration_no' => 'sometimes',
            'date' => 'required|date',
            'paid' => 'sometimes|numeric',
            'visit_no' => 'sometimes|numeric',
            'last_visit' => 'sometimes|numeric',

            'medicines' => 'sometimes|array',
            'medicines.*.name' => 'sometimes',
            'medicines.*.dose' => 'sometimes',
            'medicines.*.instruction' => 'sometimes',
            'medicines.*.duration' => 'sometimes',

            'cc' => 'sometimes|array',
            'cc.*.name' => 'sometimes',
            'cc.*.duration' => 'sometimes',
            'cc.*.unit' => 'sometimes',

            'ho' => 'sometimes|array',
            'ho.types' => 'sometimes|array',
            'ho.types.*' => 'sometimes',
            'ho.description' => 'sometimes',

            'oe' => 'sometimes|array',
            'oe.*.name' => 'sometimes',
            'oe.*.value' => 'sometimes',
            'oe.*.unit' => 'sometimes',

            'dx' => 'sometimes|array',
            'dx.*.name' => 'sometimes',

            'ix' => 'sometimes|array',
            'ix.*.name' => 'sometimes',

            'plan' => 'sometimes|array',
            'plan.*.name' => 'sometimes',

            'oh' => 'sometimes|array',
            'oh.*.name' => 'sometimes',
            'oh.*.value' => 'sometimes',

            'mh' => 'sometimes|array',
            'mh.*.name' => 'sometimes',
            'mh.*.value' => 'sometimes',

            'after_come' => 'sometimes',
//            'after_come.*.count' => 'required|numeric',
//            'after_come.*.type' => 'required|'. Rule::in(['day', 'month']),

            'bmi' => 'sometimes|array',
            'bmi.weight' => 'sometimes',
            'bmi.height_feet' => 'sometimes',
            'bmi.height_inch' => 'sometimes',
            'bmi.result' => 'sometimes',
            'bmi.class' => 'sometimes',
            'bmi.ideal_weight' => 'sometimes',

            'insulin' => 'sometimes|array',
            'insulin.weight' => 'sometimes',
            'insulin.unit' => 'sometimes',
            'insulin.time' => 'sometimes',
            'insulin.result' => 'sometimes',
            'insulin.dose' => 'sometimes',

            'z_score' => 'sometimes|array',
//            'z_score.dob' => 'sometimes|date',
            'z_score.dob' => 'sometimes',
            'z_score.gender' => 'sometimes',
            'z_score.weight' => 'sometimes',
            'z_score.result' => 'sometimes',
            'z_score.days' => 'sometimes',
            'z_score.ideal_weight' => 'sometimes',
            'z_score.weight_excess' => 'sometimes',

            'bmr' => 'sometimes|array',
            'bmr.weight' => 'sometimes',
            'bmr.height_feet' => 'sometimes',
            'bmr.height_inch' => 'sometimes',
            'bmr.gender' => 'sometimes',
            'bmr.age' => 'sometimes',
            'bmr.activity' => 'sometimes',
            'bmr.result' => 'sometimes',
            'bmr.calorie_need' => 'sometimes',

            'edd' => 'sometimes|array',
            'edd.lmp' => 'sometimes',
            'edd.age' => 'sometimes',
            'edd.result' => 'sometimes',

            'report_history' => 'sometimes|array',
            'report_history.*.date' => 'sometimes|date',
            'report_history.*.name' => 'sometimes',
            'report_history.*.value' => 'sometimes',
            'report_history.*.unit' => 'sometimes',

            'ot_notes' => 'sometimes|array',
            'ot_notes.*.name' => 'sometimes',
            'ot_notes.*.value' => 'sometimes',

            'salient_features' => 'sometimes|array',
            'salient_features.*.name' => 'sometimes',
            'salient_features.*.value' => 'sometimes',

            'past_history' => 'sometimes|array',
            'past_history.*.name' => 'sometimes',
            'past_history.*.value' => 'sometimes',

            'medical_certificates' => 'sometimes|array',
            'medical_certificates.*.name' => 'sometimes',
            'medical_certificates.*.value' => 'sometimes',

            'others' => 'sometimes|array',
            'others.*.name' => 'sometimes',
            'others.*.value' => 'sometimes',

            'notes' => 'sometimes|array',
            'notes.*' => 'sometimes',

            'advices' => 'sometimes',

//            'printing' => 'sometimes|array',
//            'printing.past_history' => 'sometimes|boolean',
//            'printing.notes' => 'sometimes|boolean',
//            'printing.edd' => 'sometimes|boolean',

            'status' => 'required|'.Rule::in(['pending', 'done'])
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
