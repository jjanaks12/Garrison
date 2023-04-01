<?php

namespace App\Models;

use App\Triats\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory, UsesUuid;

    public function roles()
    {
        return $this->belongsToMany((Role::class));
    }
}
