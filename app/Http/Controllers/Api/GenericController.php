<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\GenericRequest;
use App\Repositories\GenericRepository;
use Exception;

class GenericController extends Controller
{
    private GenericRepository $repository;

    public function __construct(GenericRepository $repository)
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
            $generics = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData);
            return $this->entityResponse($generics);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(GenericRequest $request)
    {
        try {
            if ($this->repository->create($request->validated())) {
                return $this->messageResponse('Generic created successfully', 201, 'success');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try {
            $fields = [
                $this->primaryKey(),
                'name',
                'mode_of_action',
                'status'
            ];
            $condition = [];
            $withRelations = [
                'medicines' => function ($q) {
                    $q->with([
                        'strength:id,name',
                        'medicine_type:id,name',
                        'manufacturer:id,name'
                    ])->select(['id', 'name', 'generic_id', 'strength_id', 'medicine_type_id', 'manufacturer_id', 'package_prices']);
                },
                'strengths:id,name,generic_ids',
                'medicine_types:id,name,generic_ids',
            ];
            if (!$generic = $this->repository->show($id, $fields, $condition, $withRelations)) {
                return $this->messageResponse();
            }
            return $this->entityResponse($generic);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(GenericRequest $request, $id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$generic = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $generic->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }
            $generic->update($request->validated());
            return $this->messageResponse('Generic updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$generic = $this->repository->show($id)) {
                return $this->messageResponse();
            }
            if ((string) $generic->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }
            $generic->delete();
            return $this->messageResponse('Generic deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
