<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Product;
use App\Models\Stock;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        // Statistiques Clients
        $totalClients = Client::count();
        $clientsActifs = Client::whereNotNull('email')->count(); // ou un champ "active"

        // Statistiques Produits
        $totalProducts = Product::count();
        $totalValue = Product::sum('price'); // Valeur totale des produits

        // Statistiques Stock
        $totalStock = Stock::sum('quantite');
        $stockCritique = Stock::whereColumn('quantite', '<=', 'seuilAlerte')->count();
        $lowStockProducts = Stock::with('product')
            ->whereColumn('quantite', '<=', 'seuilAlerte')
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'clients' => [
                    'total' => $totalClients,
                    'actifs' => $clientsActifs,
                ],
                'products' => [
                    'total' => $totalProducts,
                    'total_value' => number_format($totalValue, 2),
                ],
                'stock' => [
                    'total' => $totalStock,
                    'critique' => $stockCritique,
                    'low_stock' => $lowStockProducts,
                ],
            ],
            'recent_clients' => Client::latest()->take(5)->get(),
            'recent_products' => Product::with('stock')->latest()->take(5)->get(),
            'auth' => [
                'user' => [
                    'name' => Auth::user()->name,
                    'email' => Auth::user()->email,
                ],
            ]
        ]);
    }
}