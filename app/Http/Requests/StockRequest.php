<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StockRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'quantite' => 'required|integer|min:0',
            'seuilAlerte' => 'required|integer|min:0',
            'product_id' => 'required|exists:products,id',
        ];
    }
}