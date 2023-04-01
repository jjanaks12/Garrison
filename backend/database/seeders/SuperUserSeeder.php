<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SuperUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $manage_user = \App\Models\Permission::create(['title' => 'manage_user']);
        $create_user = \App\Models\Permission::create(['title' => 'create_user']);
        $edit_user = \App\Models\Permission::create(['title' => 'edit_user']);
        $view_user = \App\Models\Permission::create(['title' => 'view_user']);
        $delete_user = \App\Models\Permission::create(['title' => 'delete_user']);

        $manage_role = \App\Models\Permission::create(['title' => 'manage_role']);
        $create_role = \App\Models\Permission::create(['title' => 'create_role']);
        $edit_role = \App\Models\Permission::create(['title' => 'edit_role']);
        $view_role = \App\Models\Permission::create(['title' => 'view_role']);
        $delete_role = \App\Models\Permission::create(['title' => 'delete_role']);
        $change_role = \App\Models\Permission::create(['title' => 'change_role']);

        $manage_permission = \App\Models\Permission::create(['title' => 'manage_permission']);
        $create_permission = \App\Models\Permission::create(['title' => 'create_permission']);
        $edit_permission = \App\Models\Permission::create(['title' => 'edit_permission']);
        $view_permission = \App\Models\Permission::create(['title' => 'view_permission']);
        $delete_permission = \App\Models\Permission::create(['title' => 'delete_permission']);

        $superAdminRole = \App\Models\Role::create(['title' => 'Super Admin']);

        $superAdminRole->permissions()->attach([$manage_user->id, $create_user->id, $edit_user->id, $view_user->id, $delete_user->id]);

        $superAdminRole->permissions()->attach([$manage_role->id, $create_role->id, $edit_role->id, $view_role->id, $delete_role->id, $change_role->id]);

        $superAdminRole->permissions()->attach([$manage_permission->id, $create_permission->id, $edit_permission->id, $view_permission->id, $delete_permission->id]);

        $admin = \App\Models\User::create([
            'name' => 'Admin',
            'address' => 'Nepal',
            'phone' => '9876543210',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
        ]);

        $admin->roles()->attach($superAdminRole);
    }
}
