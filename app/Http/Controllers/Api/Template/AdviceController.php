<?php

namespace App\Http\Controllers\Api\Template;

use App\Http\Controllers\Controller;
use App\Http\Requests\Templates\AdviceTemplateRequest;
use App\Repositories\Templates\AdviceTemplateRepository;
use Exception;

class AdviceController extends Controller
{
    private AdviceTemplateRepository $repository;

    public function __construct(AdviceTemplateRepository $repository)
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
            $advices = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData, $for);
            return $this->entityResponse($advices);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(AdviceTemplateRequest $request)
    {
        try {
            if ($this->repository->create($request->validated())) {
                return $this->messageResponse('Advice template created successfully', 201, 'success');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(AdviceTemplateRequest $request, $id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$advice = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $advice->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't update this item");
            }

            $advice->update($request->validated());
            return $this->messageResponse('Advice template updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try {
            $fields = [$this->primaryKey(), 'name', 'status', 'description'];
            if (!$advice = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }

            return $this->entityResponse($advice);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$advice = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $advice->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }

            $advice->delete();
            return $this->messageResponse('Advice template deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
