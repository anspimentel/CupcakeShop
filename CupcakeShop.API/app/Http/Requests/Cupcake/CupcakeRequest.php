<?php

namespace App\Http\Requests\Cupcake;

use Illuminate\Foundation\Http\FormRequest;

class CupcakeRequest extends FormRequest
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
            'description' => [
                'required',
                'string',
                'max:65535',
            ],
            'ingredients' => [
                'required',
                'string',
                'max:65535',
            ],
            'amount' => [
                'required',
                'numeric',
                'min:0.1',
                'max:21474836',
            ],
            'quantity' => [
                'required',
                'integer',
                'min:0',
                'max:2147483647',
            ],
            'image' => [
                'sometimes',
                'image',
                'mimes:jpeg,png,jpg,gif,svg,webp',
                'max:2048',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome deve ser informado',
            'name.max' => 'O nome deve ter no máximo 256 caracteres',
            'description.required' => 'A descrição deve ser informada',
            'description.max' => 'A descrição deve ter no máximo 65535 caracteres',
            'ingredients.required' => 'Os ingredientes devem ser informados',
            'ingredients.max' => 'Os ingredientes devem ter no máximo 65535 caracteres',
            'amount.required' => 'O valor deve ser informado',
            'amount.numeric' => 'O valor deve ser um número',
            'amount.min' => 'O valor deve ser maior ou igual a 0.1',
            'amount.max' => 'O valor deve ser menor ou igual a 21474836',
            'quantity.required' => 'A quantidade deve ser informada',
            'quantity.integer' => 'A quantidade deve ser um número inteiro',
            'quantity.min' => 'A quantidade deve ser maior ou igual a 0',
            'quantity.max' => 'A quantidade deve ser menor ou igual a 2147483647',
            'image.image' => 'A imagem deve ser uma imagem',
            'image.mimes' => 'A imagem deve ser uma imagem JPEG, PNG, JPG, GIF, SVG ou WebP',
            'image.max' => 'A imagem deve ter no máximo 2048KB',
        ];
    }
}
