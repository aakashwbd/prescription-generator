<?php

namespace App\Http\Controllers\Api\Template;

use App\Http\Controllers\Controller;
use App\Http\Requests\Templates\DurationTemplateRequest;
use App\Repositories\Templates\DurationTemplateRepository;
use Exception;

class DurationController extends Controller
{
    private DurationTemplateRepository $repository;

    public function __construct(DurationTemplateRepository $repository)
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
            $durations = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData, $for);
            return $this->entityResponse($durations);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function store(DurationTemplateRequest $request)
    {
        try {
            if ($this->repository->create($request->validated())) {
                return $this->messageResponse('Duration template created successfully', 201, 'success');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(DurationTemplateRequest $request, $id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$duration = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $duration->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't update this item");
            }
            $duration->update($request->validated());
            return $this->messageResponse('Duration template updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try {
            $fields = [$this->primaryKey(), 'name', 'status', 'description'];
            if (!$duration = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }

            return $this->entityResponse($duration);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $fields = [$this->primaryKey(), 'user_id'];
            if (!$duration = $this->repository->show($id, $fields)) {
                return $this->messageResponse();
            }
            if ((string) $duration->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }
            $duration->delete();
            return $this->messageResponse('Duration template deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
