<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StrengthRequest;
use App\Repositories\StrengthRepository;
use Exception;

class StrengthController extends Controller
{
    private StrengthRepository $repository;

    public function __construct(StrengthRepository $repository)
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
            $strengths = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData);
            return $this->entityResponse($strengths);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(StrengthRequest $request)
    {
        try {
            if ($this->repository->create($request->validated())) {
                return $this->messageResponse('Strength created successfully', 201, 'success');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try {
            $fields = [$this->primaryKey(), 'name', 'status', 'generics'];
            if (!$strength = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            return $this->entityResponse($strength);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(StrengthRequest $request, $id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$strength = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $strength->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't update this item");
            }
            $strength->update($request->validated());
            return $this->messageResponse('Strength updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$strength = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $strength->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }
            $strength->delete();
            return $this->messageResponse('Strength deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
