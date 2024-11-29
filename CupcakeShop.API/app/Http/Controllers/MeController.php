<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\MeRequest;
use App\Http\Resources\User\UserResource;
use Illuminate\Support\Facades\Auth;

class MeController extends Controller
{
    public function me()
    {
        $user = Auth::user();

        return new UserResource($user);
    }

    public function update(MeRequest $request)
    {
        $user = Auth::user();

        $validated = $request->validated();

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'zipcode' => $validated['zipcode'],
            'street' => $validated['street'],
            'number' => $validated['number'],
            'neighborhood' => $validated['neighborhood'],
            'state' => $validated['state'],
            'city' => $validated['city'],
            'phone' => $validated['phone'],
        ]);

        if (!empty($validated['password'])) {
            $user->update(['password' => $validated['password']]);
        }

        return response()->noContent();
    }
}
