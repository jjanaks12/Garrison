<?php

namespace App\Models;

use App\Triats\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory, UsesUuid;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
