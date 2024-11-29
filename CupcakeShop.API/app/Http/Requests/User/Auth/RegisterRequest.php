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
                'max:256',
            ],
            'zipcode' => [
                'string',
                'min:8',
                'max:8',
                'regex:/^\d{8}$/',
            ],
            'street' => [
                'string',
                'max:256',
            ],
            'number' => [
                'string',
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
                'max:64',
            ],
            'phone' => [
                'string',
                'min:9',
                'max:15',
                'regex:/^\d{9,15}$/',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome deve ser informado',
            'name.max' => 'O nome deve ter no máximo 256 caracteres',
            'email.required' => 'O email deve ser informado',
            'email.email' => 'O email deve ser um endereço de email',
            'email.max' => 'O email deve ter no máximo 256 caracteres',
            'email.unique' => 'O email informado já foi cadastrado',
            'password.confirmed' => 'As senhas não coincidem',
            'password.required' => 'A senha deve ser informada',
            'password.min' => 'A senha deve ter no mínimo 8 caracteres',
            'password.max' => 'A senha deve ter no máximo 256 caracteres',
            'zipcode.min' => 'O CEP deve ter exatamente 8 caracteres',
            'zipcode.regex' => 'O CEP deve ser um número de 8 dígitos, sem caracteres adicionais como "-"',
            'neighborhood.max' => 'O bairro deve ter no máximo 256 caracteres',
            'state.max' => 'O estado deve ter no mínimo 32 caracteres',
            'phone.min' => 'O telefone deve ter no mínimo 9 caracteres',
            'phone.max' => 'O telefone deve ter no máximo 15 caracteres',
            'phone.regex' => 'O telefone deve ser um número de telefone brasileiro, sem caracteres adicionais como "(", ")", "-", ou espaços',
        ];
    }

    /**
     * Prepare the data for validation by removing unwanted characters.
     *
     * @return array
     */
    public function prepareForValidation()
    {
        // Remove caracteres não numéricos de phone e zipcode
        $this->merge([
            'phone' => preg_replace('/\D/', '', $this->phone),
            'zipcode' => preg_replace('/\D/', '', $this->zipcode),
        ]);
    }
}
