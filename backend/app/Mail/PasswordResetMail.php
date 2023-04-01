<?php

namespace App\Mail;

use App\Models\PasswordReset;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;
    public $user, $passwordReset, $host;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(PasswordReset $passwordReset, User $user, $host)
    {
        $this->user = $user;
        $this->passwordReset = $passwordReset;
        $this->host = $host;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('info@admin.com', 'Admin')
            ->subject($this->user->name . ' your request for password has been answered')
            ->view('mail.password_reset');
    }
}
