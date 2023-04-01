<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $per_page = $request->get('per_page') ? $request->get('per_page') : 1000;
        $roles = Role::query();

        $roles->with('permissions');

        if ($request->get('s'))
            $roles = $roles->whereRaw('UPPER(title) LIKE ?', ['%' . strtoupper($request->get('s')) . '%']);

        if ($per_page === 1000) {
            $roles = $roles->where('priority', '!=', 0);
        }

        return response()->json(
            $roles
                ->orderBy('created_at', 'DESC')
                ->paginate($per_page),
            200
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RoleRequest $request)
    {
        $role = new Role();
        $role->title = $request->get('title');
        $role->priority = 1;
        $role->save();

        return response()->json($role, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return response()->json($role, 200);
    }

    public function assignPermission(Request $request, Role $role)
    {
        $role->permissions()->detach();

        $role->permissions()->attach($request->get('permissions'));

        return response()->json([$role->with(['permissions'])], 200);
    }
}
