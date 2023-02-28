<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Otp User Mail</title>
</head>

<body>
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
            <a href="https://pos.ccninfotech.com"
               style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">{{ env('APP_NAME') }}</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing {{ env('APP_NAME') }}. Use the following OTP to complete your OTP verification
            procedures. OTP is valid till {{$payload->validate_till}}.</p>
        <h2
            style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
            {{ $payload->code }}</h2>
        <p style="font-size:0.9em;">Regards,<br />{{ env('APP_NAME') }}</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>CCN InfoTech Limited</p>
            <p>Basundhara, Dhaka</p>
            <p>Bangladesh</p>
        </div>
    </div>
</div>
</body>

</html>
