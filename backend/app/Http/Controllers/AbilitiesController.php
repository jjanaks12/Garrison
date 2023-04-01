<?php

namespace App\Http\Controllers;

use App\Http\Resources\AbilityResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AbilitiesController extends Controller
{
    public function index()
    {
        $permissions = Auth::user()->roles()->with('permissions')->get();

        if (count($permissions))
            $permissions = $permissions->pluck('permissions')
                ->flatten()
                ->pluck('title')
                ->toArray();

        return new AbilityResource($permissions);
    }
}
