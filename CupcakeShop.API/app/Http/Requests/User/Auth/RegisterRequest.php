<?php

namespace App\Http\Requests\User\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:256',
            ],
            'email' => [
                'required',
                'string',
                'email',
                'unique:users',
                'max:256',
            ],
            'password' => [
                'required',
                'confirmed',
                'min:8',
                'max:256'
            ],
            'zipcode' => [
                'string',
                'max:8',
                'min:8'
            ],
            'street' => [
                'string',
                'max:256',
            ],
            'number' => [
                'string'
            ],
            'neighborhood' => [
                'string',
                'max:256',
            ],
            'state' => [
                'string',
                'max:32',
            ],
            'city' => [
                'string',
                'max:64'
            ],
            'phone' => [
                'string'
            ],
        ];
    }
}
