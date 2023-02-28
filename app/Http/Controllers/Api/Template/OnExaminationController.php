<?php

namespace App\Http\Controllers\Api\Template;

use App\Http\Controllers\Controller;
use App\Http\Requests\Templates\OnExaminationTemplateRequest;
use App\Repositories\Templates\OnExaminationTemplateRepository;
use Exception;

class OnExaminationController extends Controller
{
    private OnExaminationTemplateRepository $repository;

    public function __construct(OnExaminationTemplateRepository $repository)
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
            $onExaminations = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData, $for);
            return $this->entityResponse($onExaminations);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function getAll()
    {
        try {
            $fields = [$this->primaryKey(), 'name'];
            $onExaminations = $this->repository->getAll($fields, ['status' => 'active']);
            return $this->entityResponse($onExaminations);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(OnExaminationTemplateRequest $request)
    {
        try {
            if ($this->repository->create($request->validated())) {
                return $this->messageResponse('On examination template created successfully', 201, 'success');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(OnExaminationTemplateRequest $request, $id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$onExamination = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $onExamination->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't update this item");
            }

            $onExamination->update($request->validated());
            return $this->messageResponse('On examination template updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try {
            $fields = [$this->primaryKey(), 'name', 'status', 'description'];
            if (!$onExamination = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }

            return $this->entityResponse($onExamination);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$onExamination = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $onExamination->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }

            $onExamination->delete();
            return $this->messageResponse('On examination template deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
