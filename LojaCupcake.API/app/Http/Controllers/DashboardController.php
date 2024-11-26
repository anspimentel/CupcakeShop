<?php

namespace App\Http\Controllers;

use App\Models\Cupcake;

class DashboardController extends Controller
{
    public function getCount()
    {
        $cupcakesCount = Cupcake::count();

        return response()->json([
            'data' => [
                'cupcakesCount' => $cupcakesCount,
            ]
        ], 200);
    }
}
