<?php

namespace App\Repositories;

use App\Models\PregnancyCategory;

class PregnancyCategoryRepository extends BaseRepository
{
    public function getPaginate($offset = 10, $fields = ['id'], $condition = [], $relations = [], $searchData = '')
    {
        $query = PregnancyCategory::query();
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
        $query = PregnancyCategory::query();
        if (count($condition) > 0) {
            $query = $query->where($condition);
        }
        return $query->select($fields)->get();
    }

    public function create($payload)
    {
        return PregnancyCategory::create($payload);
    }

    public function show($id, $fields = ['id'], $condition = [], $relations = [])
    {
        $query = PregnancyCategory::query();
        if (count($condition) > 0) {
            $query = $query->where($condition);
        }
        if (count($relations) > 0) {
            $query = $query->with($relations);
        }
        return $query->select($fields)->where($this->primaryKey(), $id)->first();
    }
}
