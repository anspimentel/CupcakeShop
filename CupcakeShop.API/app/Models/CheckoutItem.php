<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckoutItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'checkout_id',
        'cupcake_id',
        'name',
        'amount',
        'quantity',
        'total_amount',
        'delivery_type',
        'payment_type',
    ];

    public function checkout()
    {
        return $this->belongsTo(Checkout::class);
    }

    public function cupcake()
    {
        return $this->belongsTo(Cupcake::class);
    }
}
