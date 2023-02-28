<?php

namespace App\Repositories;

use App\Models\TemplateSetting;
use App\Models\User;

class TemplateSettingRepository extends BaseRepository
{
    public function getPaginate($offset = 10, $fields = ['id'], $condition = [], $relations = [])
    {
        $query = TemplateSetting::query();
        if (auth()->user()->role === User::ROLE['doctor']) {
            $query = $query->where('user_id', auth()->id());
        }
        if (count($condition) > 0) {
            $query = $query->where($condition);
        }
        return $this->customPaginate($query->select($fields)->paginate($offset)->toArray());
    }

    public function create($payload)
    {
        $data = $payload;
        if (auth()->user()->role === User::ROLE['doctor']) {
            $data['user_id'] = auth()->id();
        }
        return TemplateSetting::create($data);
    }

    public function show($id, $fields = ['id'], $condition = [])
    {
        $query = TemplateSetting::query();
        if (auth()->user()->role === User::ROLE['doctor']) {
            $query = $query->where('user_id', auth()->id());
        }
        if (count($condition) > 0) {
            $query = $query->where($condition);
        }
        return $query->select($fields)->where($this->primaryKey(), $id)->first();
    }

    public function showByCondition($fields = ['id'], $condition = [])
    {
        $query = TemplateSetting::query();
        if (auth()->user()->role === User::ROLE['doctor']) {
            $query = $query->where('user_id', auth()->id());
        }
        if (count($condition) > 0) {
            $query = $query->where($condition);
        }
        return $query->select($fields)->first();
    }
}
