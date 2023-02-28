<?php

namespace App\Http\Controllers\Api\Template;

use App\Http\Controllers\Controller;
use App\Http\Requests\Templates\CubicCentimeterTemplateRequest;
use App\Repositories\Templates\CubicCentimeterTemplateRepository;
use Exception;

class CubicCentimeterController extends Controller
{
    private CubicCentimeterTemplateRepository $repository;

    public function __construct(CubicCentimeterTemplateRepository $repository)
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
            $cubicCentimeters = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData, $for);
            return $this->entityResponse($cubicCentimeters);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(CubicCentimeterTemplateRequest $request)
    {
        try {
            if ($this->repository->create($request->validated())) {
                return $this->messageResponse('Cubic centimeter template created successfully', 201, 'success');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(CubicCentimeterTemplateRequest $request, $id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$cubicCentimeter = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $cubicCentimeter->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't update this item");
            }

            $cubicCentimeter->update($request->validated());
            return $this->messageResponse('Cubic centimeter template updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try {
            $fields = [$this->primaryKey(), 'name', 'status', 'description'];
            if (!$cubicCentimeter = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }

            return $this->entityResponse($cubicCentimeter);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$cubicCentimeter = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ($cubicCentimeter->user_id !== auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }

            $cubicCentimeter->delete();
            return $this->messageResponse('Cubic centimeter template deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
