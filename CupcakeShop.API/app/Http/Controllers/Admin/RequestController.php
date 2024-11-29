<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CheckoutItem;

class RequestController extends Controller
{
    public function index()
    {
        $requests = CheckoutItem::get();

        return response()->json([
            'data' => $requests
        ]);
    }
}
