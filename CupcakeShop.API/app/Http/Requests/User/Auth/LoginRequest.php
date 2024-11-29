<?php

namespace App\Http\Requests\User\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => [
                'required',
                'email',
                'max:256',
            ],
            'password' => [
                'required',
                'min:8',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'O e-mail deve ser informado.',
            'email.email' => 'O e-mail deve ser válido.',
            'password.required' => 'A senha deve ser informada.',
            'password.min' => 'A senha deve ter no mínimo 8 caracteres.',
        ];
    }
}
