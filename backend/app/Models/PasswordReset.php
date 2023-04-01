<?php

namespace App\Models;

use App\Triats\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    use HasFactory, UsesUuid;

    /**
     * The change the table name from defaults.
     *
     * @var array<string, string>
     */
    protected $table = 'password_resets';
}
