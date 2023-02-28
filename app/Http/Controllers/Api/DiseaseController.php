<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DiseaseRequest;
use App\Repositories\DiseaseRepository;
use Exception;

class DiseaseController extends Controller
{
    private DiseaseRepository $repository;

    public function __construct(DiseaseRepository $repository)
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
            $diseases = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData);
            return $this->entityResponse($diseases);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(DiseaseRequest $request)
    {
        try {
            if ($this->repository->create($request->validated())) {
                return $this->messageResponse('Disease created successfully', 201, 'success');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try {
            $fields = [$this->primaryKey(), 'name', 'status'];
            if (!$disease = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }

            return $this->entityResponse($disease);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(DiseaseRequest $request, $id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$disease = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $disease->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't update this item");
            }

            $disease->update($request->validated());
            return $this->messageResponse('Disease updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$disease = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $disease->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }

            $disease->delete();
            return $this->messageResponse('Disease deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
