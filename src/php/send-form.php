<?php

  mb_internal_encoding('UTF-8');

  // Esto le dice a PHP que generaremos cadenas UTF-8
  mb_http_output('UTF-8');
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
          // may also be using PUT, PATCH, HEAD etc
          header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
          header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

      exit(0);
  }

function response($msg, $status, $code, $error){
  $res=[
    "msg" => $msg,
    "status" => $status,
    "code" => $code,
    "error" => $error
  ];
  print_r(json_encode($res));
}


$to = "info@tequilamandala.com";

$name = $_POST['name'];
$surname = $_POST['surname'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$msg = $_POST['msg'];

if(!empty($name) || !empty($surname) || !empty($phone) || !empty($email) || !empty($msg)){
  $email_saliente_nombre = $name .' '.$surname;
  $email_saliente = $email;
  $subject = "Contact form tequilamandala.com ";
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $headers .= "From: {$email_saliente_nombre} <{$email_saliente}>\r\n";
//dirección de respuesta, si queremos que sea distinta que la del remitente
  $headers .= "Reply-To: {$email}\r\n";
  $message = "
    <html>
    <head>
    <title>HTML</title>
    </head>
    <body>    
    An email has been received from tequilamandala.com<br><br>
    Name: <b>{$name}</b> <br><br>
    Suname: <b>{$surname}</b> <br><br>
    Email: <b>{$email}</b> <br><br> 
    Phone: <b>{$phone}</b> <br><br> 
    Message: <b>{$msg}</b> <br><br> 
    </body>
    </html>";

// response('Formulario enviado con exito.</br>En breve nos pondremos en contacto con usted', "ok",200, null);
  if (mail($to, $subject, $message, $headers)) {
    response('Form sent successfully. </br> We will contact you shortly', "ok", 200, null);
  } else {
    response('An error occurred.</br> Please try again late', "error", 400, true);
  };
}else {
  response('Incomplete data.</br> Please check and try again', "error", 400, true);
}