<?php

namespace App\Http\Controllers\Api\Template;

use App\Http\Controllers\Controller;
use App\Http\Requests\Templates\InvestigationTemplateRequest;
use App\Repositories\Templates\InvestigationTemplateRepository;
use Exception;

class InvestigationController extends Controller
{
    private InvestigationTemplateRepository $repository;

    public function __construct(InvestigationTemplateRepository $repository)
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
            $investigations = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData, $for);
            return $this->entityResponse($investigations);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(InvestigationTemplateRequest $request)
    {
        try {
            if ($this->repository->create($request->validated())) {
                return $this->messageResponse('Investigation template created successfully', 201, 'success');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(InvestigationTemplateRequest $request, $id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$investigation = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $investigation->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't update this item");
            }

            $investigation->update($request->validated());
            return $this->messageResponse('Investigation template updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try {
            $fields = [$this->primaryKey(), 'name', 'status', 'description'];
            if (!$investigation = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }

            return $this->entityResponse($investigation);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$investigation = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $investigation->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }

            $investigation->delete();
            return $this->messageResponse('Investigation template deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
