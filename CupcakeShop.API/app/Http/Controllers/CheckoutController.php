<?php

namespace App\Http\Controllers;

use App\Enums\CheckoutStatusType;
use App\Enums\DeliveryType;
use App\Enums\PaymentType;
use App\Exceptions\OutStockException;
use App\Http\Requests\Checkout\CheckoutRequest;
use App\Http\Resources\Checkout\CheckoutItemsResource;
use App\Models\Checkout;
use App\Models\CheckoutItem;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function userAuthenticated(): User
    {
        return Auth::user();
    }

    public function index()
    {
        $user = $this->userAuthenticated();

        $checkouts = $user->checkouts()->with('items.cupcake')->get();

        $checkoutItems = $checkouts->flatMap(function ($checkout) {
            return $checkout->items;
        });

        $orderItems = $checkoutItems->sortBy(function ($item) {
            return $item->status === CheckoutStatusType::CANCELED->value ? 1 : 0;
        });

        return CheckoutItemsResource::collection($orderItems);
    }

    public function checkout(CheckoutRequest $request)
    {
        /** @var User */
        $user = Auth::user();

        $cartItems = $user->items;

        if ($cartItems->isEmpty()) {
            return response()->json([
                'message' => 'Cart is empty.'
            ], 400);
        }

        DB::beginTransaction();

        try {
            $totalAmount = 0;

            $items = collect();

            foreach ($cartItems as $cartItem) {
                $cupcake = $cartItem->cupcake;

                if ($cupcake->quantity < $cartItem->quantity) {
                    throw new OutStockException($cupcake->name, 400);
                }

                $totalAmount += $cupcake->amount * $cartItem->quantity;

                $checkoutItem = new CheckoutItem([
                    'cupcake_id' => $cupcake->id,
                    'name' => $cupcake->name,
                    'amount' => $cupcake->amount,
                    'quantity' => $cartItem->quantity,
                    'total_amount' => $totalAmount,
                    'delivery_type' => DeliveryType::from($request->delivery_type)->value,
                    'payment_type' => PaymentType::from($request->payment_type)->value,
                    'status' => CheckoutStatusType::FINISHED->value,
                ]);

                $cupcake->decrement('quantity', $cartItem->quantity);

                $items->push($checkoutItem);
            }

            $checkout = Checkout::create([
                'user_id' => $user->id,
                'amount' => $totalAmount,
                'delivery_type' => DeliveryType::from($request->delivery_type)->value,
                'payment_type' => PaymentType::from($request->payment_type)->value,
            ]);

            $checkout->items()->saveMany($items);

            $user->items()->delete();

            DB::commit();

            return response()->json([
                'message' => 'Checkout successfully.',
                'total_amount' => $totalAmount,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();

            if ($e instanceof OutStockException) {
                return response()->json([
                    'message' => $e->getMessage(),
                ], $e->getCode());
            }

            return response()->json([
                'message' => 'An error occurred during checkout.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function cancelCheckout(CheckoutItem $checkout)
    {
        $checkout->status = CheckoutStatusType::CANCELED->value;

        $checkout->save();

        return response()->noContent();
    }

    public function show(CheckoutItem $checkout)
    {
        return new CheckoutItemsResource($checkout);
    }
}
