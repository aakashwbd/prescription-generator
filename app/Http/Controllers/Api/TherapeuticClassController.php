<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TherapeuticClassRequest;
use App\Repositories\TherapeuticClassRepository;
use Exception;

class TherapeuticClassController extends Controller
{
    private TherapeuticClassRepository $repository;

    public function __construct(TherapeuticClassRepository $repository)
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
            $therapeuticClasses = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData);
            return $this->entityResponse($therapeuticClasses);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(TherapeuticClassRequest $request)
    {
        try {
            if ($this->repository->create($request->validated())) {
                return $this->messageResponse('Therapeutic class created successfully', 201, 'success');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try {
            $fields = [$this->primaryKey(), 'name', 'generic_ids', 'status'];
            $condition = [];
            $withRelations = ['generics:id,name,mode_of_action'];
            if (!$therapeuticClass = $this->repository->show($id, $fields, $condition, $withRelations)) {
                return $this->messageResponse();
            }
            return $this->entityResponse($therapeuticClass);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(TherapeuticClassRequest $request, $id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$therapeuticClass = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $therapeuticClass->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }
            $therapeuticClass->update($request->validated());
            return $this->messageResponse('Therapeutic class updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$therapeuticClass = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $therapeuticClass->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }
            $therapeuticClass->delete();
            return $this->messageResponse('Therapeutic class deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
