<?php

namespace App\Http\Controllers\Api\Template;

use App\Http\Controllers\Controller;
use App\Http\Requests\Templates\MedicineTemplateRequest;
use App\Repositories\Templates\MedicineTemplateRepository;
use Exception;

class MedicineController extends Controller
{
    private MedicineTemplateRepository $repository;

    public function __construct(MedicineTemplateRepository $repository)
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
            $for = null;
            if (request()->has('for') && request()->input('for')) {
                $for = request()->input('for');
            }
            if (request()->has('search') && request()->input('search')) {
                $searchData = request()->input('search');
            }
            $medicines = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData, $for);
            return $this->entityResponse($medicines);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(MedicineTemplateRequest $request)
    {
        try {
            if ($this->repository->create($request->validated())) {
                return $this->messageResponse('Medicine template created successfully', 201, 'success');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(MedicineTemplateRequest $request, $id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$medicine = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $medicine->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't update this item");
            }

            $medicine->update($request->validated());
            return $this->messageResponse('Medicine template updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try {
            $fields = [$this->primaryKey(), 'name', 'status', 'medicines'];
            if (!$medicine = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }

            return $this->entityResponse($medicine);
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
            if ((string) $medicine->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }

            $medicine->delete();
            return $this->messageResponse('Medicine template deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
