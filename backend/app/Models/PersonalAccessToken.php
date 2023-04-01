<?php

namespace App\Models;

use App\Triats\UsesUuid;
use Laravel\Sanctum\PersonalAccessToken as BasePersonalAccessToken;

class PersonalAccessToken extends BasePersonalAccessToken 
{
    use UsesUuid;

    public function tokenable()
    {
        return $this->morphTo('tokenable', "tokenable_type", "tokenable_id");
    }
}
