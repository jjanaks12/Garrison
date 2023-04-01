<?php

namespace App\Mail;

use App\Models\Role;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RoleAssign extends Mailable
{
    use Queueable, SerializesModels;
    public $role, $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Role $role, User $user)
    {
        $this->role = $role;
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('info@admin.com', 'Admin')
            ->subject('Congratulation you have been assigned as ' . $this->role->title)
            ->view('mail.roleAssign');
    }
}
