<?php

namespace App\Http\Controllers;

use App\Http\Requests\StockRequest;
use App\Http\Resources\StockResource;
use App\Http\Resources\ProductResource;
use App\Models\Stock;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StockController extends Controller
{
    public function index()
    {
        
        return inertia('Stocks/Index', [
            'stocks' => StockResource::collection(Stock::with('product')->get())->resolve(),
            'products'=> ProductResource::collection(Product::with('stock')->get())->resolve(),
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
        return inertia('Stocks/Create',[
            'products' => ProductResource::collection(Product::with('stock')->get())->resolve(),
            'auth' => [
                'user' => [
                    'name' => Auth::user()->name,
                    'email' => Auth::user()->email,
                ],
            ]
        ]);
    }

    public function store(StockRequest $request)
    {
        $stock = Stock::create($request->validated());
        return redirect()->route('stocks.index')->with('success', 'Stock created successfully.');
    }

    public function show(Stock $stock)
    {
        return inertia('Stocks/Show', [
            'stock' => new StockResource($stock->load('product'))->resolve(),
            'auth' => [
                'user' => [
                    'name' => Auth::user()->name,
                    'email' => Auth::user()->email,
                ],
            ]
        ]);
    }


    public function edit(Stock $stock)
    {
        return inertia('Stocks/Edit', [
        'stock' => new StockResource($stock)->resolve(),
        'auth' => [
            'user' => [
                'name' => Auth::user()->name,
                'email' => Auth::user()->email,
            ],
        ]
        ]);
    }

    public function update(StockRequest $request, Stock $stock)
    {
        $stock->update($request->validated());
        return redirect()->route('stocks.index')->with('success', 'Stock updated successfully.');
    }

    public function destroy(Stock $stock)
    {
        $stock->delete();
        return redirect()->route('stocks.index')->with('success', 'Stock deleted successfully.');
    }
}