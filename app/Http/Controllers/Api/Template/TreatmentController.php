<?php

namespace App\Http\Controllers\Api\Template;

use App\Http\Controllers\Controller;
use App\Http\Requests\Templates\TreatmentTemplateRequest;
use App\Repositories\Templates\TreatmentTemplateRepository;
use Exception;

class TreatmentController extends Controller
{
    private TreatmentTemplateRepository $repository;

    public function __construct(TreatmentTemplateRepository $repository)
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
            $treatments = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData, $for);
            return $this->entityResponse($treatments);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function getAll()
    {
        try {
            $fields = [$this->primaryKey(), 'name'];
            $treatments = $this->repository->getAll($fields, ['status' => 'active']);
            return $this->entityResponse($treatments);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(TreatmentTemplateRequest $request)
    {
        try {
            if ($this->repository->create($request->validated())) {
                return $this->messageResponse('Treatment template created successfully', 201, 'success');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(TreatmentTemplateRequest $request, $id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$treatment = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $treatment->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't update this item");
            }

            $treatment->update($request->validated());
            return $this->messageResponse('Treatment template updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try {
            $fields = [$this->primaryKey(), 'name', 'status', 'medicines'];
            if (!$treatment = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }

            return $this->entityResponse($treatment);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$treatment = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $treatment->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }
            $treatment->delete();
            return $this->messageResponse('Treatment template deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
