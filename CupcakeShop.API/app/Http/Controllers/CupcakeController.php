<?php

namespace App\Http\Controllers;

use App\Http\Requests\Cupcake\CupcakeRequest;
use App\Http\Resources\Cupcake\CupcakeInfoResource;
use App\Http\Resources\Cupcake\CupcakeResource;
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

        return response()->json([
            'data' => $cupcakes
        ], 200);
    }

    public function store(CupcakeRequest $request)
    {
        $validated = $request->validated();

        $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();

        Cupcake::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'ingredients' => $validated['ingredients'],
            'amount' => $validated['amount'],
            'quantity' => $validated['quantity'],
            'image' => $imageName,
        ]);

        Storage::disk('public')->put($imageName, file_get_contents($request->image));

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

        $cupcake->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'ingredients' => $validated['ingredients'],
            'amount' => $validated['amount'],
            'quantity' => $validated['quantity'],
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
