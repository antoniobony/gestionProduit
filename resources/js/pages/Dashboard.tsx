import React from 'react';
import { Head } from '@inertiajs/react';
import { Users, Package, AlertTriangle, TrendingUp } from 'lucide-react';
import AppLayout from '@/component/layout/AppLayout';

interface Client {
    id: number;
    nom: string;
    email: string;
    telephone: string;
    adresse?: string;
}

interface Product {
    id: number;
    nom: string;
    price: number;
}

interface Stock {
    id: number;
    quantite: number;
    seuilAlerte: number;
    product?: Product;
}

interface Stats {
    clients: {
        total: number;
        actifs: number;
    };
    products: {
        total: number;
        total_value: string;
    };
    stock: {
        total: number;
        critique: number;
        low_stock: Stock[];
    };
}

interface DashboardProps {
    stats: Stats;
    recent_clients: Client[];
    recent_products: Product[];
    auth: { user: { name: string; email: string } };
}

export default function Dashboard({ stats, recent_clients,auth }: DashboardProps) {
    const { clients, products, stock } = stats;

    return (
        <AppLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                            Tableau de Bord
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
                            {new Date().toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>

                    {/* Statistiques Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {/* Card Clients */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Clients</h3>
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                                {clients.total}
                            </div>
                            <p className="text-green-600 text-sm font-medium">
                                {clients.actifs} clients actifs
                            </p>
                        </div>

                        {/* Card Produits */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Produits</h3>
                                <Package className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                                {products.total}
                            </div>
                            <p className="text-gray-500 text-sm">
                                Valeur totale : <span className="font-semibold">{products.total_value} €</span>
                            </p>
                        </div>

                        {/* Card Stock Total */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Stock Total</h3>
                                <TrendingUp className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                                {stock.total}
                            </div>
                            <p className="text-gray-500 text-sm">unités en stock</p>
                        </div>

                        {/* Card Stock Critique */}
                        <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border p-6 hover:shadow-md transition-shadow ${stock.critique > 0 ? 'border-red-500 bg-red-50 dark:bg-red-950' : 'border-gray-200 dark:border-gray-700'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Stock Critique</h3>
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="text-4xl font-bold text-red-600 mb-1">
                                {stock.critique}
                            </div>
                            <p className="text-red-600 text-sm font-medium">produits en alerte</p>
                        </div>
                    </div>

                    {/* Sections détaillées */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Derniers Clients */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-semibold mb-5 text-gray-900 dark:text-white">Derniers Clients</h2>
                            <div className="space-y-5">
                                {recent_clients.length > 0 ? (
                                    recent_clients.map((client) => (
                                        <div key={client.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{client.nom}</p>
                                                <p className="text-sm text-gray-500">{client.email}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-mono text-gray-400">{client.telephone}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 py-8">Aucun client pour le moment</p>
                                )}
                            </div>
                        </div>

                        {/* Produits en Alerte Stock */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-semibold mb-5 text-gray-900 dark:text-white">Produits en Alerte Stock</h2>
                            {stock.low_stock.length > 0 ? (
                                <div className="space-y-4">
                                    {stock.low_stock.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 rounded-xl"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {item.product?.nom}
                                                </p>
                                                <p className="text-sm text-red-600">
                                                    Stock actuel : <span className="font-bold">{item.quantite}</span>
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">Seuil d'alerte</p>
                                                <p className="font-bold text-red-600 text-lg">{item.seuilAlerte}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-green-600 dark:text-green-400">
                                    <div className="text-5xl mb-3">🎉</div>
                                    <p className="font-medium">Aucun produit en stock critique</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}