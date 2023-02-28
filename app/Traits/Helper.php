<?php

namespace App\Traits;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Response;

trait Helper
{
    protected function serverError($exception): Response|Application|ResponseFactory
    {
        return response(['status' => 'server_error', 'statusCode' => 500, 'message' => $exception->getMessage(),], 500);
    }

//    protected function validateError($data): Response|Application|ResponseFactory
//    {
//        return response(['status' => 'validate_error', 'statusCode' => 422, 'data' => $data,], 422);
//    }

    protected function validateError($data, $override = false): Response|Application|ResponseFactory
    {
        $errors = [];
        $errorPayload = !$override ? $data->getMessages() : $data;

        foreach($errorPayload as $key => $value) {
            $errors[$key] = $value[0];
        }

        return response(['status' => 'validate_error', 'statusCode' => 422, 'data' => $errors], 422);
    }

    protected function messageResponse($message = 'No data found', $statusCode = 404, $status = 'error'): Response|Application|ResponseFactory
    {
        return response(['status' => $status, 'statusCode' => $statusCode, 'message' => $message,], $statusCode);
    }

    protected function entityResponse($data = null, $statusCode = 200, $status = 'success', $message = null): Response|Application|ResponseFactory
    {
        $payload = ['status' => $status, 'statusCode' => $statusCode, 'data' => $data,];

        if ($message) {
            $payload['message'] = $message;
        }

        return response($payload, $statusCode);
    }

    protected function primaryKey(): string
    {
        return str_contains(env('DB_CONNECTION'), 'mongo') ? '_id' : 'id';
    }

    protected function jwtDecode()
    {
        $token = request()->header('Authorization');
        if ($token && auth()->check()) {
            return json_decode(base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $token)[1]))));
        } else {
            return $this->messageResponse('Unauthenticated', 401);
        }
    }

    protected function fieldsGenerator($fieldText)
    {
        if($fieldText && str_contains($fieldText, ',')){
            return explode(',',$fieldText);
        }

        return null;
    }

    protected function nestedFieldsGenerator($fields)
    {
        $searchFields = $fields;
        $jsonFields = [];
        foreach($searchFields as $index => $field){
            if(str_contains($field,':')){
                $explode = explode(':', $field);
                array_key_exists($explode[0], $jsonFields) ? $jsonFields[$explode[0]] .= ','.$explode[1] : $jsonFields[$explode[0]] = $explode[1];
                unset($searchFields[$index]);
                if(!in_array($explode[0], $searchFields)){
                    $searchFields[] = $explode[0];
                }
            }
        }

        return ['searching_fields' => $searchFields, 'nested_fields' => $jsonFields];
    }

    protected function conditionGenerator()
    {
        if(request()->has('condition') && request('condition')){
            return explode(',',request('condition'));
        }

        return null;
    }

    public function searchFor($template, $query)
    {
        $searchQuery = $query;
        if($template === 'public'){
            $searchQuery = $query->whereNull('user_id');
        }elseif($template === 'system+private'){
            $searchQuery = $query->where('user_id', auth()->id())->orWhereNull('user_id');
        }elseif($template === 'private'){
            $searchQuery = $query->where('user_id', auth()->id());
        }

        return $searchQuery;
    }
}
