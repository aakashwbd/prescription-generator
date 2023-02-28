<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MedicineTypeRequest;
use App\Repositories\MedicineTypeRepository;
use Exception;
use Illuminate\Http\Request;

class MedicineTypeController extends Controller
{
    private MedicineTypeRepository $repository;

    public function __construct(MedicineTypeRepository $repository){
        $this->repository = $repository;
    }

    public function index()
    {
        try{
            $fields = [$this->primaryKey(), 'name', 'status'];
            $offset = request()->input('offset') ?? 10;
            $condition = [];
            $searchData = null;
            $withRelations = [];
            if (request()->has('search') && request()->input('search')) {
                $searchData = request()->input('search');
            }
            $medicineTypes = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData);
            return $this->entityResponse($medicineTypes);
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function store(MedicineTypeRequest $request)
    {
        try{
            if($this->repository->create($request->validated())){
                return $this->messageResponse('Medicine type created successfully', 201, 'success');
            }
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try{
            $fields = [$this->primaryKey(), 'name', 'status', 'generics'];
            if(!$medicineType = $this->repository->show($id, $fields)){
                return $this->messageResponse();
            }

            return $this->entityResponse($medicineType);
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function update(MedicineTypeRequest $request, $id)
    {
        try{
            $fields = [$this->primaryKey(), 'user_id'];
            if(!$medicineType = $this->repository->show($id, $fields)){
                return $this->messageResponse();
            }
            if ((string) $medicineType->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't update this item");
            }

            $medicineType->update($request->validated());
            return $this->messageResponse('Medicine type updated successfully', 200, 'success');
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try{
            $fields = [$this->primaryKey(), 'user_id'];
            if(!$medicineType = $this->repository->show($id, $fields)){
                return $this->messageResponse();
            }
            if ((string) $medicineType->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }

            $medicineType->delete();
            return $this->messageResponse('Medicine type deleted successfully', 200, 'success');
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }
}
