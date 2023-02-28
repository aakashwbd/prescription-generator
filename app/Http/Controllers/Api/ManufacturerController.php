<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ManufacturerRequest;
use App\Repositories\ManufacturerRepository;
use Exception;
use Illuminate\Http\Request;

class ManufacturerController extends Controller
{
    private ManufacturerRepository $repository;

    public function __construct(ManufacturerRepository $repository){
        $this->repository = $repository;
    }

    public function index()
    {
        try{
            $fields = [$this->primaryKey(), 'name', 'status'];
            $manufacturers = $this->repository->getPaginate(request('offset'), $fields);
            return $this->entityResponse($manufacturers);
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function getAll()
    {
        try{
            $fields = [$this->primaryKey(), 'name'];
            $manufacturers = $this->repository->getAll($fields, ['status' => 'active']);
            return $this->entityResponse($manufacturers);
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function store(ManufacturerRequest $request)
    {
        try{
            if($this->repository->create($request->validated())){
                return $this->messageResponse('Manufacturer created successfully', 201, 'success');
            }
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try{
            $fields = [$this->primaryKey(), 'name', 'status'];
            if(!$manufacturer = $this->repository->show($id, $fields)){
                return $this->messageResponse();
            }

            return $this->entityResponse($manufacturer);
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function update(ManufacturerRequest $request, $id)
    {
        try{
            $fields = [$this->primaryKey(), 'user_id'];
            if(!$manufacturer = $this->repository->show($id, $fields)){
                return $this->messageResponse();
            }
            $manufacturer->update($request->validated());
            return $this->messageResponse('Manufacturer updated successfully', 200, 'success');
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try{
            $fields = [$this->primaryKey(), 'user_id'];
            if(!$manufacturer = $this->repository->show($id, $fields)){
                return $this->messageResponse();
            }
            $manufacturer->delete();
            return $this->messageResponse('Manufacturer deleted successfully', 200, 'success');
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }
}
