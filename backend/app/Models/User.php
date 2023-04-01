<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Triats\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Sanctum\Sanctum;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, UsesUuid, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function tokens()
    {
        return $this->morphMany(Sanctum::$personalAccessTokenModel, 'tokenable', "tokenable_type", "tokenable_id");
    }

    public function roles()
    {
        return $this->belongsToMany((Role::class));
    }

    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    public function attendace()
    {
        return $this->hasMany(Attendance::class);
    }
}
