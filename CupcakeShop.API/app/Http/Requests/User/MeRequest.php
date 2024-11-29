<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class MeRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = Auth::user();

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
                Rule::unique('users')->ignore($user->id),
                'max:256',
            ],
            'password' => [
                'nullable',
                'confirmed',
                'min:8',
                'max:256',
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

        return $rules;
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome deve ser informado.',
            'name.string' => 'O nome deve ser uma string.',
            'name.max' => 'O nome deve ter no máximo 256 caracteres.',
            'email.required' => 'O e-mail deve ser informado.',
            'email.string' => 'O e-mail deve ser uma string.',
            'email.email' => 'O e-mail deve ser válido.',
            'email.unique' => 'O e-mail já está em uso.',
            'email.max' => 'O e-mail deve ter no máximo 256 caracteres.',
            'password.confirmed' => 'A confirmação de senha não confere.',
            'password.min' => 'A senha deve ter no mínimo 8 caracteres.',
            'password.max' => 'A senha deve ter no máximo 256 caracteres.',
            'zipcode.string' => 'O CEP deve ser uma string.',
            'zipcode.max' => 'O CEP deve ter no máximo 8 caracteres.',
            'zipcode.min' => 'O CEP deve ter no mínimo 8 caracteres.',
            'street.string' => 'A rua deve ser uma string.',
            'street.max' => 'A rua deve ter no máximo 256 caracteres.',
            'number.string' => 'O número deve ser uma string.',
            'neighborhood.string' => 'O bairro deve ser uma string.',
            'neighborhood.max' => 'O bairro deve ter no máximo 256 caracteres.',
            'state.string' => 'O estado deve ser uma string.',
            'state.max' => 'O estado deve ter no máximo 32 caracteres.',
            'city.string' => 'A cidade deve ser uma string.',
            'city.max' => 'A cidade deve ter no máximo 64 caracteres.',
            'phone.string' => 'O telefone deve ser uma string.',
        ];
    }
}
