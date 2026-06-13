<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index()
    {
        return inertia('Products/Index', [
            'products' => ProductResource::collection(Product::with('stock')->get())->resolve(),
            'auth' => [
                'user' => [
                    'name' => Auth::user()->name,
                    'email' => Auth::user()->email,
                ],
            ]
        ]);
    }

    public function create()
    {
        return inertia('Products/Create',[
            'auth' => [
                'user' => [
                    'name' => Auth::user()->name,
                    'email' => Auth::user()->email,
                ],
            ]
        ]);
    }

    public function store(ProductRequest $request)
    {
        $product = Product::create($request->validated());
        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function show(Product $product)
    {
        return inertia('Products/Show', [
            'product' => new ProductResource($product->load('stock'))->resolve(),
            'auth' => [
                'user' => [
                    'name' => Auth::user()->name,
                    'email' => Auth::user()->email,
                ],
            ]
        ]);
    }


    public function edit(Product $product)
    {
    return inertia('Products/Edit', [
        'product' => new ProductResource($product)->resolve(),
        'auth' => [
            'user' => [
                'name' => Auth::user()->name,
                'email' => Auth::user()->email,
            ],
        ]
    ]);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $product->update($request->validated());
        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}