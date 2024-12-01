<?php

namespace App\Http\Controllers;

use App\Enums\CupcakeStatusType;
use App\Http\Requests\Cupcake\CupcakeRequest;
use App\Http\Resources\Cupcake\CupcakeInfoResource;
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

        $sortedCupcakes = $cupcakes->sortBy(function ($cupcake) {
            return $cupcake->status === CupcakeStatusType::OUT_OF_STOCK->value ? 1 : 0;
        });

        return response()->json([
            'data' => $sortedCupcakes->values()
        ], 200);
    }

    public function store(CupcakeRequest $request)
    {
        $validated = $request->validated();

        $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
        $imageUrl = $this->firebaseStorage->uploadFile($request->image, $imageName);

        $status = $validated['quantity'] > 0 
            ? CupcakeStatusType::IN_STOCK->value 
            : CupcakeStatusType::OUT_OF_STOCK->value;

        $cupcake = Cupcake::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'ingredients' => $validated['ingredients'],
            'amount' => $validated['amount'],
            'quantity' => $validated['quantity'],
            'status' => $status,
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

        $status = $validated['quantity'] > 0 
            ? CupcakeStatusType::IN_STOCK->value 
            : CupcakeStatusType::OUT_OF_STOCK->value;

        $cupcake->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'ingredients' => $validated['ingredients'],
            'amount' => $validated['amount'],
            'quantity' => $validated['quantity'],
            'status' => $status,
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
