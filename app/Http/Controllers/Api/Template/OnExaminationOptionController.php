<?php

namespace App\Http\Controllers\Api\Template;

use App\Http\Controllers\Controller;
use App\Http\Requests\Templates\OnExaminationOptionRequest;
use App\Repositories\Templates\OnExaminationOptionRepository;
use Exception;

class OnExaminationOptionController extends Controller
{
    private OnExaminationOptionRepository $repository;

    public function __construct(OnExaminationOptionRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        try {
            $fields = [$this->primaryKey(), 'name', 'position', 'status'];
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
            $onExaminationOptions = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData, $for);
            return $this->entityResponse($onExaminationOptions);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(OnExaminationOptionRequest $request)
    {
        try {
            if ($this->repository->create($request->validated())) {
                return $this->messageResponse('On examination option created successfully', 201, 'success');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(OnExaminationOptionRequest $request, $id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$onExaminationOption = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $onExaminationOption->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't update this item");
            }

            $onExaminationOption->update($request->validated());
            return $this->messageResponse('On examination option updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try {
            $fields = [$this->primaryKey(), 'name', 'status', 'value', 'position'];
            if (!$onExaminationOption = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }

            return $this->entityResponse($onExaminationOption);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$onExaminationOption = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $onExaminationOption->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }
            $onExaminationOption->delete();
            return $this->messageResponse('On examination option deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
