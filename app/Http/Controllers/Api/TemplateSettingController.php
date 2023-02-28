<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TemplateSettingRequest;
use App\Repositories\TemplateSettingRepository;
use Exception;

class TemplateSettingController extends Controller
{
    private TemplateSettingRepository $repository;

    public function __construct(TemplateSettingRepository $repository){
        $this->repository = $repository;
    }

    public function index()
    {
        try{
            $fields = [$this->primaryKey(), 'templates'];
            $offset = request()->input('offset') ?? 10;
            $condition = [];
            $templateSettings = $this->repository->getPaginate($offset, $fields, $condition);
            return $this->entityResponse($templateSettings);
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function store(TemplateSettingRequest $request)
    {
        try{
            if($this->repository->create($request->validated())){
                return $this->messageResponse('Template setting created successfully', 201, 'success');
            }
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try{
            $fields = [$this->primaryKey(), 'templates'];
            if(!$templateSetting = $this->repository->show($id, $fields)){
                return $this->messageResponse();
            }

            return $this->entityResponse($templateSetting);
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function update(TemplateSettingRequest $request, $id)
    {
        try{
            $fields = [$this->primaryKey(), 'user_id'];
            if(!$templateSetting = $this->repository->show($id, $fields)){
                return $this->messageResponse();
            }
            if ((string) $templateSetting->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't update this item");
            }

            $templateSetting->update($request->validated());
            return $this->messageResponse('Template setting updated successfully', 200, 'success');
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try{
            if(!$templateSetting = $this->repository->show($id)){
                return $this->messageResponse();
            }
            if ((string) $templateSetting->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }

            $templateSetting->delete();
            return $this->messageResponse('Page setup deleted successfully', 200, 'success');
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }
}
