<html>
<head>
</head>
<body>
    <h1>Hi {{ $user->name }}</h1>
    <p>Your request for password reset has been answered.</p>
    <a href="{{ $host.'/password_reset?token='.$passwordReset->token.'&&email='.$user->email }}">reset password</a>
</body>
</html>
