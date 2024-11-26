<?php

namespace App\Http\Controllers;

use App\Http\Requests\Cupcake\CupcakeRequest;
use App\Http\Resources\Cupcake\CupcakeInfoResource;
use App\Http\Resources\Cupcake\CupcakeResource;
use App\Models\Cupcake;
use App\Services\FirebaseStorageService;
use Illuminate\Support\Str;

class CupcakeController extends Controller
{
    protected $firebaseStorage;

    public function __construct(FirebaseStorageService $firebaseStorage)
    {
        $this->firebaseStorage = $firebaseStorage;
    }
    public function index()
    {
        $cupcakes = Cupcake::get();

        return response()->json([
            'data' => $cupcakes
        ], 200);
    }

    public function store(CupcakeRequest $request)
    {
        $validated = $request->validated();

        $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
        $imageUrl = $this->firebaseStorage->uploadFile($request->image, $imageName);

        Cupcake::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'ingredients' => $validated['ingredients'],
            'amount' => $validated['amount'],
            'quantity' => $validated['quantity'],
            'image' => $imageName,
        ]);

        return response()->json([
            'message' => 'Cupcake successfully registered.',
            'image_url' => $imageUrl
        ], 201);
    }

    public function show(Cupcake $cupcake)
    {
        return new CupcakeInfoResource($cupcake);
    }

    public function update(CupcakeRequest $request, Cupcake $cupcake)
    {
        $validated = $request->validated();

        $cupcake->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'ingredients' => $validated['ingredients'],
            'amount' => $validated['amount'],
            'quantity' => $validated['quantity'],
        ]);

        if ($request->hasFile('image')) {
            $this->firebaseStorage->deleteFile($cupcake->image);
            $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
            $imageUrl = $this->firebaseStorage->uploadFile($request->image, $imageName);
            $cupcake->update(['image' => $imageName]);
        }

        $imageUrl = isset($imageUrl) ? $imageUrl : null;

        return response()->noContent();
    }

    public function destroy(Cupcake $cupcake)
    {
        $this->firebaseStorage->deleteFile($cupcake->image);

        $cupcake->delete();

        return response()->noContent();
    }
}
