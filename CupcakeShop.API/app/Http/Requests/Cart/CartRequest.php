<?php

namespace App\Http\Requests\Cart;

use Illuminate\Foundation\Http\FormRequest;

class CartRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'quantity' => [
                'required',
                'integer',
                'min:1',
                'max:2147483647'
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'quantity.required' => 'A quantidade deve ser informada.',
            'quantity.integer' => 'A quantidade deve ser um número inteiro.',
            'quantity.min' => 'A quantidade deve ser maior ou igual a 1.',
            'quantity.max' => 'A quantidade deve ser menor ou igual a 2147483647.',
        ];
    }
}
