<?php


$destino = "tino@nh-digital.mx";
$asunto = "Contacto de fnd";
$mensaje = "Hola soy nombre y este es mi teléfono telefono";

$cabeceras = "From: tino@sigma.com";

if (mail($destino, $asunto, $mensaje, $cabeceras))
{
    echo("Correo enviado");
}
else
{
    echo("Error en el envío");
}


?>