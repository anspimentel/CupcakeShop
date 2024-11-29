<?php

namespace App\Http\Resources\Cupcake;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CupcakeInfoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'ingredients' => $this->ingredients,
            'amount' => $this->amount,
            'quantity' => $this->quantity,
            'image' => $this->image,
            'status' => $this->status,
            'created_at' => $this->created_at->toDateTimeLocalString(),
        ];
    }
}
