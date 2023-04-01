<?php

namespace App\Http\Controllers;

use App\Mail\RoleAssign;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;


class UserController extends Controller
{
    private $monthNameList = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    public function index(Request $request)
    {
        $per_page = $request->get('per_page') ? $request->get('per_page') : 1000;
        $users = User::query();

        if ($request->get('s'))
            $users = $users->whereRaw('UPPER(name) LIKE ?', ['%' . strtoupper($request->get('s')) . '%']);

            // return $users->get();
        return response()->json(
            $users
                ->orderBy('created_at', 'DESC')
                ->with(['roles', 'media'])
                ->paginate($per_page),
            200
        );
    }

    public function assignRole(User $user, Role $role)
    {
        $user->roles()->detach();
        $user->roles()->attach($role);

        Mail::to($user->email)->send(new RoleAssign($role, $user));

        return response()->json([$user, $role], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        abort_if(Gate::denies('manage_user'), Response::HTTP_FORBIDDEN, 'You do not have enough permission');

        $user->delete();

        return response()->json($user, 200);
    }

    public function report(Request $request)
    {
        $filter = $request->get('filter') ?? 'yearly';
        $start_date = '';
        $end_date = '';
        $counter = [];

        $users = User::query();

        if ($filter === 'yearly') {
            $users = $users->get()
                ->groupBy(function ($user) {
                    return Carbon::parse($user->created_at)->format('Y');
                });

            foreach ($users as $key => $value) {
                $counter[$key] = count($value);
            }
        }

        if ($filter === 'monthly') {
            $users = User::selectRaw('year(created_at) as year, monthname(created_at) as month, count(*) as count')
                ->groupBy('year', 'month')
                ->orderByRaw('min(created_at) desc')
                ->get();

            foreach ($users as $count) {
                foreach ($this->monthNameList as $monthName) {
                    if ($monthName === $count['month'])
                        $counter[$count['year']][$monthName] = $count['count'];
                    else
                        $counter[$count['year']][$monthName] = 0;
                }
            }
        }

        // if ($filter === 'weekly') {
        //     $users = User::selectRaw('year(created_at) as year, week(created_at) as week, count(*) as count')
        //         ->groupBy('year', 'week')
        //         ->orderByRaw('min(created_at) desc')
        //         ->get();

        //     foreach ($users as $count) {
        //         $counter[$count['year']][$count['month']] = $count['count'];
        //     }
        // }

        return response()->json($counter, 200);
    }
}
