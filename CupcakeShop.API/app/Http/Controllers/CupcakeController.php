<?php

namespace App\Http\Controllers;

use App\Enums\CupcakeStatusType;
use App\Http\Requests\Cupcake\CupcakeRequest;
use App\Http\Resources\Cupcake\CupcakeInfoResource;
use App\Models\Cupcake;
use App\Services\FirebaseStorageService;
use Illuminate\Support\Facades\Storage;
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

        $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();

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

        if($request->image) {
 
            $storage = Storage::disk('public');
  
            if($storage->exists($cupcake->image))
                $storage->delete($cupcake->image);
  
            $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
            $cupcake->image = $imageName;
  
            $storage->put($imageName, file_get_contents($request->image));
        }

        return response()->noContent();
    }

    public function destroy(Cupcake $cupcake)
    {
        $storage = Storage::disk('public');
      
        if($storage->exists($cupcake->image))
            $storage->delete($cupcake->image);

        $cupcake->delete();

        return response()->noContent();
    }
}
