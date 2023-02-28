<?php

namespace App\Repositories;

use App\Models\Manufacturer;
use App\Models\User;

class ManufacturerRepository extends BaseRepository
{
    public function getPaginate($offset = 10, $fields = ['id'], $condition = [], $relations = [], $searchData = '')
    {
        $query = Manufacturer::query();
        if (auth()->user()->role === User::ROLE['doctor']) {
            $query = $query->where('user_id', auth()->id())->orWhereNull('user_id');
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
        $query = Manufacturer::query();
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
        return Manufacturer::create($data);
    }

    public function show($id, $fields = ['id'], $condition = [], $relations = [])
    {
        $query = Manufacturer::query();
        if (auth()->user()->role === User::ROLE['doctor']) {
            $query = $query->where('user_id', auth()->id())->orWhereNull('user_id');
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
