<?php

namespace App\Repositories;

use App\Models\Prescription;
use App\Models\User;

class PrescriptionRepository extends BaseRepository
{
    public function getPaginate($offset = 10, $fields = ['id'], $condition = [], $relations = [], $searchData = '')
    {
        $query = Prescription::query();
        if (auth()->user()->role === User::ROLE['doctor']) {
            $query = $query->where('user_id', auth()->id());
        }
        if ($searchData) {
            $query = $query->where('name', 'LIKE', '%' . $searchData . '%')->orWhere('appoint_no', 'LIKE', '%' . $searchData . '%');
        }
        if (count($condition) > 0) {
            $query = $query->where($condition);
        }
        if (count($relations) > 0) {
            $query = $query->with($relations);
        }
        return $this->customPaginate($query->select($fields)->paginate($offset)->toArray());
    }

    public function getAll($fields = ['id'], $condition = [])
    {
        $query = Prescription::query();
        if (auth()->user()->role === User::ROLE['doctor']) {
            $query = $query->where('user_id', auth()->id());
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
        return Prescription::create($data);
    }

    public function show($id, $fields = ['id'], $condition = [], $relations = [])
    {
        $query = Prescription::query();
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

    public function summary($for = 'daily', $condition = [])
    {
        $query = Prescription::query();
        if (auth()->user()->role === User::ROLE['doctor']) {
            $query = $query->where('user_id', auth()->id());
        }
        if(count($condition) > 0){
            $query = $query->where($condition);
        }
        $query = match($for){
            'monthly' => $query->whereMonth('date', today()->month)->whereYear
            ('date', today()->year),
            'yearly' => $query->whereYear('date', today()->year),
            default => $query->whereDay('date', today()->day)->whereMonth('date', today()->month)->whereYear
            ('date', today()->year)
        };

        return $query->select(['paid'])->sum('paid');
    }
}
