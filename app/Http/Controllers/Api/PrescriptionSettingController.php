<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PrescriptionSettingRequest;
use App\Repositories\PrescriptionSettingRepository;
use Exception;

class PrescriptionSettingController extends Controller
{
    private PrescriptionSettingRepository $repository;

    public function __construct(PrescriptionSettingRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        try {
            $fields = [
                $this->primaryKey(),
                'user_id',
                'font_size',
                'line_per_page',
                'visit_fee',
                're_visit_fee',
                're_visit_validity',
                'default_revisit_count',
                'barcode_display',
                'barcode_position',
                'multiple_page_print',
                'visit_no_display',
                'patient_info',
                'name_display',
                'age_display',
                'gender_display',
                'weight_display',
                'date_display',
                'address_display',
                'registration_no_display',
                'mobile_display',
                'cubic_centimeter_display',
                'on_examination_display',
                'advice_display',
                'disease_display',
                'footer_display',
                'print_past_history',
                'print_present_history',
                'print_notes',
                'print_edd',
            ];
            $offset = request()->input('offset') ?? 10;
            $condition = [];
            $searchData = null;
            $withRelations = ['user:id,name,email'];
            if (request()->has('search') && request()->input('search')) {
                $searchData = request()->input('search');
            }
            $prescriptionSettings = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData);
            return $this->entityResponse($prescriptionSettings);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(PrescriptionSettingRequest $request)
    {
        try {
            if ($this->repository->create($request->validated())) {
                return $this->messageResponse('Prescription setting created successfully', 201, 'success');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try {
            $fields = [
                $this->primaryKey(),
                'user_id',
                'font_size',
                'line_per_page',
                'visit_fee',
                're_visit_fee',
                're_visit_validity',
                'default_revisit_count',
                'barcode_display',
                'multiple_page_print',
                'visit_no_display',
                'patient_info',
                'name_display',
                'age_display',
                'gender_display',
                'weight_display',
                'date_display',
                'address_display',
                'registration_no_display',
                'mobile_display',
                'cubic_centimeter_display',
                'on_examination_display',
                'advice_display',
                'disease_display',
                'footer_display',
                'print_past_history',
                'print_present_history',
                'print_notes',
                'print_edd',
            ];
            if (!$prescriptionSetting = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }

            return $this->entityResponse($prescriptionSetting);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(PrescriptionSettingRequest $request, $id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$prescriptionSetting = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $prescriptionSetting->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't update this item");
            }
            $prescriptionSetting->update($request->validated());
            return $this->messageResponse('Prescription setting updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$prescriptionSetting = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $prescriptionSetting->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }
            $prescriptionSetting->delete();
            return $this->messageResponse('Prescription setting deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
