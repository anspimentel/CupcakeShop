<?php

namespace App\Http\Controllers;

use App\Http\Requests\Cart\CartRequest;
use App\Http\Resources\Cart\CartResource;
use App\Models\CartItem;
use App\Models\Cupcake;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function userAuthenticated(): User
    {
        return Auth::user();
    }

    public function index()
    {
        $user = $this->userAuthenticated();

        $cartItems = $user->items;

        return CartResource::collection($cartItems);
    }

    public function addItemCart(CartRequest $request, Cupcake $cupcake)
    {
        $user = $this->userAuthenticated();

        $validated = $request->validated();

        $cartItem = $user
            ->items
            ->where('cupcake_id', $cupcake->id)
            ->first();


        if ($cartItem) {
            $cartItem->increment('quantity', $validated['quantity']);
        } else {
            CartItem::create([
                'user_id' => $user->id,
                'cupcake_id' => $cupcake->id,
                'quantity' => $validated['quantity'],
            ]);
        }

        return response()->json([
            'message' => 'Cupcake added to cart.'
        ], 201);
    }

    public function removeFromCart(Cupcake $cupcake)
    {
        $user = $this->userAuthenticated();

        $cartItem = $user
            ->items
            ->where('cupcake_id', $cupcake->id)
            ->firstOrFail();

        $cartItem->delete();

        return response()->noContent();
    }

    public function increaseQuantity(Cupcake $cupcake)
    {
        $user = $this->userAuthenticated();

        if (!$cupcake) {
            return response()->json([
                'message' => 'Cupcake not found.'
            ], 404);
        }

        $cartItem = $user
            ->items
            ->where('cupcake_id', $cupcake->id)
            ->firstOrFail();

        $cartItem->increment('quantity');

        return response()->json([
            'message' => 'Cupcake quantity increased.'
        ], 200);
    }

    public function decreaseQuantity(Cupcake $cupcake)
    {
        $user = $this->userAuthenticated();

        $cartItem = $user
            ->items
            ->where('cupcake_id', $cupcake->id)
            ->firstOrFail();

        if ($cartItem->quantity > 1) {
            $cartItem->decrement('quantity');
        } else {
            $cartItem->delete();
        }

        return response()->json([
            'message' => 'Cupcake quantity decreased.'
        ], 200);
    }
}
