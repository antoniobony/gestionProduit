<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientController extends Controller
{
    public function index()
    {
        return inertia('Clients/Index', [
            'clients' => ClientResource::collection(Client::all())->resolve(),
            'auth' => [
            'user' => [
                'name' => Auth::user()->name,
                'email' => Auth::user()->email,
            ],
        ],
        ]);
    }

    public function create(){
         return inertia('Clients/Create',[
            'auth' => [
                'user' => [
                    'name' => Auth::user()->name,
                    'email' => Auth::user()->email,
                ],
            ]
         ]);
    }

    public function store(ClientRequest $request)
    {
        $client = Client::create($request->validated());
        return redirect()->route('clients.index')->with('success', 'Client created successfully.');
    }

    public function show(Client $client)
    {
        return inertia('Clients/Show', [
            'client' => new ClientResource($client)->resolve(),
            'auth' => [
                'user' => [
                    'name' => Auth::user()->name,
                    'email' => Auth::user()->email,
                ],
            ]
        ]);
    }

    public function edit(Client $client)
    {
    return inertia('Clients/Edit', [
        'client' => new ClientResource($client)->resolve(),
        'auth' => [
            'user' => [
                'name' => Auth::user()->name,
                'email' => Auth::user()->email,
            ],
        ]
    ]);
    }

    public function update(ClientRequest $request, Client $client)
    {
        $client->update($request->validated());
        return redirect()->route('clients.index')->with('success', 'Client updated successfully.');
    }

    public function destroy(Client $client)
    {
        $client->delete();
        return redirect()->route('clients.index')->with('success', 'Client deleted successfully.');
    }
}