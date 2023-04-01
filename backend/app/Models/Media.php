<?php

namespace App\Models;

use App\Triats\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    use HasFactory, UsesUuid;

    /**
     * The change the table name from defaults.
     *
     * @var array<string, string>
     */
    protected $table = 'medias';

    /**
     * The attributes that should be added.
     *
     * @var array<string, string>
     */
    protected $appends = ['url'];

    public function users()
    {
        return $this->hasOne(User::class);
    }

    public function getUrlAttribute()
    {
        return env('APP_URL') . Storage::url($this->path);
    }
}
