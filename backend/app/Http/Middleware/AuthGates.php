<?php

namespace App\Http\Middleware;

use App\Models\Role;
use App\Models\User;
use Closure;
use Illuminate\Auth\Access\Gate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthGates
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        if ($user) {
            $roles = Role::with('permissions')->get();
            $permissionArray = [];

            foreach($roles as $role) {
                foreach($role->permissions as $permissions) {
                    $permissionArray[$permissions->title][] = $role->permissions;
                }
            }

            foreach($permissionArray as $title => $roles) {
                Gate::define($title, function(User $user) use($roles) {
                    return count(array_intersect($user->roles->pluck('title'), $roles));
                });
            }
        }

        return $next($request);
    }
}
