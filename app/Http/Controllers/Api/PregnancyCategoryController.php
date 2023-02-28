<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PregnancyCategoryRequest;
use App\Models\User;
use App\Repositories\PregnancyCategoryRepository;
use Exception;

class PregnancyCategoryController extends Controller
{
    private PregnancyCategoryRepository $repository;

    public function __construct(PregnancyCategoryRepository $repository)
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
            $pregnancyCategories = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData);
            return $this->entityResponse($pregnancyCategories);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(PregnancyCategoryRequest $request)
    {
        try {
            if (auth()->check() && auth()->user()->role !== User::ROLE['admin']) {
                return $this->messageResponse('You are not eligible to perform this action.', 400);
            }

            if ($this->repository->create($request->validated())) {
                return $this->messageResponse('Pregnancy category created successfully', 201, 'success');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try {
            $fields = [$this->primaryKey(), 'name', 'status', 'description'];
            if (!$pregnancyCategory = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }

            return $this->entityResponse($pregnancyCategory);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(PregnancyCategoryRequest $request, $id)
    {
        try {
            if (auth()->check() && auth()->user()->role !== User::ROLE['admin']) {
                return $this->messageResponse('You are not eligible to perform this action.', 400);
            }

            if (!$pregnancyCategory = $this->repository->show($id)) {
                return $this->messageResponse();
            }
            $pregnancyCategory->update($request->validated());
            return $this->messageResponse('Pregnancy category updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try {
            if (auth()->check() && auth()->user()->role !== User::ROLE['admin']) {
                return $this->messageResponse('You are not eligible to perform this action.', 400);
            }

            if (!$pregnancyCategory = $this->repository->show($id)) {
                return $this->messageResponse();
            }
            $pregnancyCategory->delete();
            return $this->messageResponse('Pregnancy category deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
