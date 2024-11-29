<?php

namespace App\Http\Requests\Checkout;

use App\Enums\DeliveryType;
use App\Enums\PaymentType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CheckoutRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'delivery_type' => [
                'required',
                'string',
                Rule::in(DeliveryType::cases(), 'value'),
            ],
            'payment_type' => [
                'required',
                'string',
                Rule::in(PaymentType::cases(), 'value'),
            ]
        ];
    }
}
