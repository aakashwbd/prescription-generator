<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PageSetupRequest;
use App\Http\Requests\PrescriptionRequest;
use App\Repositories\PageSetupRepository;
use App\Repositories\PrescriptionSettingRepository;
use Exception;
use Illuminate\Http\Request;

class PageSetupController extends Controller
{
    private PageSetupRepository $repository;

    public function __construct(PageSetupRepository $repository){
        $this->repository = $repository;
    }

    public function index()
    {
        try{
            $fields = [$this->primaryKey(),
                'header_size',
                'patient_info_size',
                'history_size',
                'footer_size',
                'prescribe_size',
                'prescription_size',
                'header_left_content',
                'header_right_content',
                'header_bg_color',
                'header_barcode_display',
                'footer_content',
            ];

            $offset = request()->input('offset') ?? 10;
            $condition = [];
            $searchData = null;
            $withRelations = [];
            if (request()->has('search') && request()->input('search')) {
                $searchData = request()->input('search');
            }
            $pageSetups = $this->repository->getPaginate($offset, $fields, $condition, $withRelations, $searchData);
            return $this->entityResponse($pageSetups);
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function store(PageSetupRequest $request)
    {
        try{
            if($this->repository->create($request->validated())){
                return $this->messageResponse('Page setup created successfully', 201, 'success');
            }
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function show($id)
    {
        try{
            $fields = [$this->primaryKey(),
                'header_size',
                'patient_info_size',
                'history_size',
                'footer_size',
                'prescribe_size',
                'prescription_size',
                'header_left_content',
                'header_right_content',
                'header_bg_color',
                'header_barcode_display',
                'footer_content',
            ];
            if(!$pageSetup = $this->repository->show($id, $fields)){
                return $this->messageResponse();
            }

            return $this->entityResponse($pageSetup);
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function update(PageSetupRequest $request, $id)
    {
        try{
            $fields = [$this->primaryKey(), 'user_id'];
            if(!$pageSetup = $this->repository->show($id, $fields)){
                return $this->messageResponse();
            }
            if ((string) $pageSetup->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't update this item");
            }

            $pageSetup->update($request->validated());
            return $this->messageResponse('Page setup updated successfully', 200, 'success');
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }

    public function destroy($id)
    {
        try{
            if(!$pageSetup = $this->repository->show($id)){
                return $this->messageResponse();
            }
            if ((string) $pageSetup->user_id !== (string) auth()->id()) {
                return $this->messageResponse("Sorry, You can't delete this item");
            }

            $pageSetup->delete();
            return $this->messageResponse('Page setup deleted successfully', 200, 'success');
        }catch (Exception $e){
            return $this->serverError($e);
        }
    }
}
