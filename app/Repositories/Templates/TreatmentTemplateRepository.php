<?php

namespace App\Repositories\Templates;

use App\Models\Templates\TreatmentTemplate;
use App\Models\User;
use App\Repositories\BaseRepository;
use App\Repositories\TemplateSettingRepository;

class TreatmentTemplateRepository extends BaseRepository
{
    public function getPaginate($offset = 10, $fields = ['id'], $condition = [], $relations = [], $searchData = '', $for = 'all')
    {
        $query = TreatmentTemplate::query();

        if ($for === 'user_specific') {
            $query = $query->where('user_id', auth()->id());
        } elseif ($for === 'system') {
            $query = $query->whereNull('user_id');
        } else {
            $templateFields = [$this->primaryKey(), 'templates'];
            $templateSetting = (new TemplateSettingRepository())->showByCondition($templateFields, []);
            if(!$templateSetting){
                $query = $query->where('user_id', auth()->id())->orWhereNull('user_id');
            }else{
                $query = $this->searchFor($templateSetting->templates['treatment'], $query);
            }
        }

        if (count($condition) > 0) {
            $query = $query->where($condition);
        }
        if ($searchData) {
            $query = $query->where('name', 'LIKE', '%' . $searchData . '%');
        }
        if (count($relations) > 0) {
            $query = $query->with($relations);
        }
        return $this->customPaginate($query->select($fields)->paginate($offset)->toArray());
    }

    public function getAll($fields = ['id'], $condition = [])
    {
        $query = TreatmentTemplate::query();
        if (auth()->user()->role === User::ROLE['doctor']) {
            $query = $query->where('user_id', auth()->id())->orWhereNull('user_id');
        }
        if (count($condition) > 0) {
            $query = $query->where($condition);
        }
        return $query->select($fields)->get();
    }

    public function create($payload)
    {
        $data = $payload;
        if (auth()->user()->role === User::ROLE['doctor']) {
            $data['user_id'] = auth()->id();
        }
        return TreatmentTemplate::create($data);
    }

    public function show($id, $fields = ['id'], $condition = [], $relations = [])
    {
        $query = TreatmentTemplate::query();
        if (auth()->user()->role === User::ROLE['doctor']) {
            $query = $query->where('user_id', auth()->id());
        }
        if (count($condition) > 0) {
            $query = $query->where($condition);
        }
        if (count($relations) > 0) {
            $query = $query->with($relations);
        }
        return $query->select($fields)->where($this->primaryKey(), $id)->first();
    }
}
