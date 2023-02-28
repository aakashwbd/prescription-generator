<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PrescriptionRequest;
use App\Repositories\PrescriptionRepository;
use Exception;

class PrescriptionController extends Controller
{
    private PrescriptionRepository $repository;

    public function __construct(PrescriptionRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        try {
            $fields = [
                $this->primaryKey(),
                "appoint_no",
                'name',
                'registration_no',
                'date',
                'age',
                'gender',
                'dx',
                'status',
                'mobile',
                'paid',
                'address'
            ];
            $offset = request()->input('offset') ?? 10;
            $condition = [];
            $searchData = null;
            $withRelations = [];
            if (request()->has('search') && request()->input('search')) {
                $searchData = request()->input('search');
            }
            $condition['status'] = match (request()->input('status')) {
                'Pending' => 'pending',
                default => 'done'
            };
            $prescriptions = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData);
            return $this->entityResponse($prescriptions);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(PrescriptionRequest $request)
    {
        try {
            if ($prescription = $this->repository->create($request->validated())) {
//                return $this->messageResponse('Prescription created successfully', 201, 'success');
                return $this->entityResponse(['id' => $prescription->id],201, 'success', 'Prescription created successfully');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(PrescriptionRequest $request, $id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$prescription = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $prescription->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't update this item");
            }
            $prescription->update($request->validated());
//            return $this->messageResponse('Prescription updated successfully', 200, 'success');
            return $this->entityResponse(['id' => $prescription->id],200, 'success', 'Prescription updated successfully');
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
                'name',
                'age',
                'gender',
                'address',
                'mobile',
                'registration_no',
                'date',
                'paid',
                'visit_no',
                'last_visit',
                'medicines',
                'cc',
                'ho',
                'oe',
                'dx',
                'ix',
                'plan',
                'oh',
                'mh',
                'after_come',
                'bmi',
                'insulin',
                'z_score',
                'bmr',
                'edd',
                'report_history',
                'ot_notes',
                'salient_features',
                'past_history',
                'medical_certificates',
                'others',
                'advices',
//                'printing',
                'status',
            ];
            if (!$prescription = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            return $this->entityResponse($prescription);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$prescription = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $prescription->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }
            $prescription->delete();
            return $this->messageResponse('Prescription deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function summary()
    {
        try{
            $todayIncomes = $this->repository->summary('daily', ['status' => 'done']);
            $monthlyIncomes = $this->repository->summary('monthly', ['status' => 'done']);
            return $this->entityResponse(['daily_income' => $todayIncomes, 'monthly_income' => $monthlyIncomes]);
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }
}
