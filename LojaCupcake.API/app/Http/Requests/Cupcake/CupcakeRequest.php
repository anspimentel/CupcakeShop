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
}
