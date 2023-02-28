<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MedicineRequest;
use App\Repositories\MedicineRepository;
use Exception;

class MedicineController extends Controller
{
    private MedicineRepository $repository;

    public function __construct(MedicineRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        try {
            $fields = [$this->primaryKey(), 'name', 'status'];
            $offset = request()->input('offset') ?? 10;
            $condition = [];
            $searchData = null;
            $withRelations = [];
            if (request()->has('search') && request()->input('search')) {
                $searchData = request()->input('search');
            }
            $medicines = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData);
            return $this->entityResponse($medicines);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(MedicineRequest $request)
    {
        try {
            if ($this->repository->create($request->validated())) {
                return $this->messageResponse('Medicine created successfully', 201, 'success');
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
                'name',
                'medicine_type_id',
                'pregnancy_category_id',
                'manufacturer_id',
                'generic_id',
                'therapeutic_class_id',
                'strength_id',
                'adult_dose',
                'child_dose',
                'renal_dose',
                'administration',
                'indication',
                'contraindication',
                'side_effect',
                'interaction',
                'package_prices',
                'status'
            ];
            $condition = [];
            $withRelations = [
                'medicine_type:id,name',
                'pregnancy_category:id,name,description',
                'manufacturer:id,name',
                'generic:id,name,mode_of_action',
                'therapeutic_class:id,name',
                'strength:id,name',
            ];
            if (!$medicine = $this->repository->show($id, $fields, $condition, $withRelations)) {
                return $this->messageResponse();
            }

            return $this->entityResponse($medicine);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(MedicineRequest $request, $id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$medicine = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if((string) $medicine->user_id !== (string) auth()->id()){
                return $this->messageResponse("Sorry, You can't update this item");
            }
            $medicine->update($request->validated());
            return $this->messageResponse('Medicine updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$medicine = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if($medicine->user_id !== auth()->id()){
                return $this->messageResponse("Sorry, You can't delete this item");
            }
            $medicine->delete();
            return $this->messageResponse('Medicine deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
