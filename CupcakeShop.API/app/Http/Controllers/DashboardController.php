<?php

namespace App\Http\Controllers;

use App\Models\CheckoutItem;
use App\Models\Cupcake;
use App\Models\User;

class DashboardController extends Controller
{
    public function getCount()
    {
        $cupcakesCount = Cupcake::count();
        $requestsCount = CheckoutItem::count();
        $usersCount = User::count();

        return response()->json([
            'data' => [
                'cupcakesCount' => $cupcakesCount,
                'requestsCount' => $requestsCount,
                'usersCount' => $usersCount
            ]
        ], 200);
    }
}
