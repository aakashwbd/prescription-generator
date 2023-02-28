<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\IndicationRequest;
use App\Repositories\IndicationRepository;
use Exception;

class IndicationController extends Controller
{
    private IndicationRepository $repository;

    public function __construct(IndicationRepository $repository)
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
            $indications = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData);
            return $this->entityResponse($indications);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(IndicationRequest $request)
    {
        try {
            if ($this->repository->create($request->validated())) {
                return $this->messageResponse('Indication created successfully', 201, 'success');
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
            $withRelations = ['generics:id,name,mode_of_action',];
            if (!$indication = $this->repository->show($id, $fields, $condition, $withRelations)) {
                return $this->messageResponse();
            }
            return $this->entityResponse($indication);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(IndicationRequest $request, $id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$indication = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $indication->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't update this item");
            }
            $indication->update($request->validated());
            return $this->messageResponse('Indication updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$indication = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $indication->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }
            $indication->delete();
            return $this->messageResponse('Indication deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
