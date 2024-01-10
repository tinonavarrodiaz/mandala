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

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

// function response($msg, $status, $code, $error){
//   $res=array(
//     msg => $msg,
//     status => $status,
//     code => $code,
//     error => $error
//   );
//   echo json_encode( $res, JSON_FORCE_OBJECT );
// }

  // $newsletter = $_POST['newsletter'];
//   response('Formulario enviado con exito </br> en breve nos pondremos en contacto con usted', true,200, null);


function response($msg, $status, $code, $error){
  $res=[
    "msg" => $msg,
    "status" => $status,
    "code" => $code,
    "error" => $error
  ];
  print_r(json_encode($res));
}

$email = $_POST['newsletter'];

$to = $email;
// $to = "tino.navarro@hotmail.com";

// if (!isset($_POST['newsletter'])) {

  $email_saliente_nombre = "Newsletter";
  $email_saliente = "newsletter@tequilamandala.com";
  $subject = "Newletter tequilamandala.com ";
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $headers .= "From: {$email_saliente_nombre} <{$email_saliente}>\r\n";
//dirección de respuesta, si queremos que sea distinta que la del remitente
  $headers .= "Reply-To: {$email}\r\n";


  $message = "
    
     <html xmlns='http://www.w3.org/1999/xhtml' xmlns:o='urn:schemas-microsoft-com:office:office' style='width:100%;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0'>
 <head> 
  <meta charset='UTF-8'> 
  <meta content='width=device-width, initial-scale=1' name='viewport'> 
  <meta name='x-apple-disable-message-reformatting'> 
  <meta http-equiv='X-UA-Compatible' content='IE=edge'> 
  <meta content='telephone=no' name='format-detection'> 
  <title>Nueva plantilla de correo electrónico 2021-09-20</title> 
  <!--[if (mso 16)]>
    <style type='text/css'>
    a {text-decoration: none;}
    </style>
    <![endif]--> 
  <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
  <!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]--> 
  <!--[if !mso]><!-- --> 
  <link href='https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i' rel='stylesheet'> 
  <!--<![endif]--> 
  <style type='text/css'>
#outlook a {
	padding:0;
}
.ExternalClass {
	width:100%;
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
	line-height:100%;
}
.es-button {
	mso-style-priority:100!important;
	text-decoration:none!important;
}
a[x-apple-data-detectors] {
	color:inherit!important;
	text-decoration:none!important;
	font-size:inherit!important;
	font-family:inherit!important;
	font-weight:inherit!important;
	line-height:inherit!important;
}
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
	mso-hide:all;
}
[data-ogsb] .es-button {
	border-width:0!important;
	padding:15px 25px 15px 25px!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class='gmail-fix'] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:15px 25px 15px 25px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
</style> 
 </head> 
 <body style='width:100%;font-family:lato, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0'> 
  <div class='es-wrapper-color' style='background-color:#ffffff'> 
   <!--[if gte mso 9]>
			<v:background xmlns:v='urn:schemas-microsoft-com:vml' fill='t'>
				<v:fill type='tile' color='#ffffff'></v:fill>
			</v:background>
		<![endif]--> 
   <table class='es-wrapper' width='100%' cellspacing='0' cellpadding='0' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top'> 
     <tr class='gmail-fix' height='0' style='border-collapse:collapse'> 
      <td style='padding:0;Margin:0'> 
       <table cellspacing='0' cellpadding='0' border='0' align='center' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px'> 
         <tr style='border-collapse:collapse'> 
          <td cellpadding='0' cellspacing='0' border='0' style='padding:0;Margin:0;line-height:1px;min-width:600px' height='0'><img src='https://ivnisd.stripocdn.email/content/guids/CABINET_837dc1d79e3a5eca5eb1609bfe9fd374/images/41521605538834349.png' style='display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px' alt width='600' height='1'></td> 
         </tr> 
       </table></td> 
     </tr> 
     <tr style='border-collapse:collapse'> 
      <td valign='top' style='padding:0;Margin:0'> 
       
       <table class='es-header' cellspacing='0' cellpadding='0' align='center' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:#FFA73B;background-repeat:repeat;background-position:center top'> 
         <tr style='border-collapse:collapse'> 
          <td align='center' bgcolor='#ffffff' style='padding:0;Margin:0;background-color:#ffffff'> 
           <table class='es-header-body' cellspacing='0' cellpadding='0' align='center' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px'> 
             <tr style='border-collapse:collapse'> 
              <td align='left' style='Margin:0;padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px'> 
               <table width='100%' cellspacing='0' cellpadding='0' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'> 
                 <tr style='border-collapse:collapse'> 
                  <td valign='top' align='center' style='padding:0;Margin:0;width:580px'> 
                   <table width='100%' cellspacing='0' cellpadding='0' role='presentation' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'> 
                     <tr style='border-collapse:collapse'> 
                      <td align='center' style='Margin:0;padding-left:10px;padding-right:10px;padding-top:25px;padding-bottom:25px;font-size:0px'><a href='https://tequilamandala.com' target='_blank' style='-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#111111;font-size:14px'><img src='data:image/png;base64,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' alt="" style='display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic' width='150'></a></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table class='es-content' cellspacing='0' cellpadding='0' align='center' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%'> 
         <tr style='border-collapse:collapse'> 
          <td style='padding:0;Margin:0;background-color:#ffffff' bgcolor='#ffffff' align='center'> 
           <table class='es-content-body' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px' cellspacing='0' cellpadding='0' align='center'> 
             <tr style='border-collapse:collapse'> 
              <td align='left' style='padding:0;Margin:0'> 
               <table width='100%' cellspacing='0' cellpadding='0' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'> 
                 <tr style='border-collapse:collapse'> 
                  <td valign='top' align='center' style='padding:0;Margin:0;width:600px'> 
                   <table style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#ffffff;border-radius:4px' width='100%' cellspacing='0' cellpadding='0' bgcolor='#ffffff' role='presentation'> 
                     
                     <tr style='border-collapse:collapse'> 
                      <td bgcolor='#ffffff' align='center' style='Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0'> 
                       <table width='100%' height='100%' cellspacing='0' cellpadding='0' border='0' role='presentation' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'> 
                         <tr style='border-collapse:collapse'> 
                          <td style='padding:0;Margin:0;border-bottom:1px solid #ffffff;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px'></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table class='es-content' cellspacing='0' cellpadding='0' align='center' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%'> 
         <tr style='border-collapse:collapse'> 
          <td align='center' style='padding:0;Margin:0'> 
           <table class='es-content-body' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px' cellspacing='0' cellpadding='0' align='center'> 
             <tr style='border-collapse:collapse'> 
              <td align='left' style='padding:0;Margin:0'> 
               <table width='100%' cellspacing='0' cellpadding='0' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'> 
                 <tr style='border-collapse:collapse'> 
                  <td valign='top' align='center' style='padding:0;Margin:0;width:600px'> 
                   <table style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:4px;background-color:#ffffff' width='100%' cellspacing='0' cellpadding='0' bgcolor='#ffffff' role='presentation'> 
                     <tr style='border-collapse:collapse'> 
                      <td class='es-m-txt-l' bgcolor='#ffffff' align='left' style='Margin:0;padding-top:20px;padding-bottom:20px;padding-left:30px;padding-right:30px'><p style='Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px'>Thank&nbsp;you for signing up to keep in touch with your favorite Tequila, Tequila Mandala. From now on, you'll get regular updates on everything Tequila Mandala.&nbsp;In Mexican culture, family is everything. Like the mandala, family is infinite. Tequila Mandala seeks to remind us to appreciate and enjoy the most important things in life and what life gives us. Our family and close friends make up the structure of the mandala. We experience this at all gatherings, whether it be a wedding, holiday, a special dinner, or even a simple break to unwind. What’s your mandala?&nbsp;Share these moments with&nbsp; us&nbsp;<a href='https://www.instagram.com/tequilamandala/' target='_blank' style='-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFA73B;font-size:18px'>@tequilamandala</a>&nbsp;on instagram and make sure to tag us on all your Tequila Mandala moments. Cheers to the start of a healthy digital relationship.</p></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table class='es-content' cellspacing='0' cellpadding='0' align='center' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%'> 
         <tr style='border-collapse:collapse'> 
          <td align='center' style='padding:0;Margin:0'> 
           <table class='es-content-body' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px' cellspacing='0' cellpadding='0' align='center'> 
             <tr style='border-collapse:collapse'> 
              <td align='left' style='padding:0;Margin:0'> 
               <table width='100%' cellspacing='0' cellpadding='0' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'> 
                 <tr style='border-collapse:collapse'> 
                  <td valign='top' align='center' style='padding:0;Margin:0;width:600px'> 
                   <table style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#01082d;border-radius:4px' width='100%' cellspacing='0' cellpadding='0' bgcolor='#01082D' role='presentation'> 
                     <tr style='border-collapse:collapse'> 
                      <td align='center' style='padding:0;Margin:0;font-size:0'> 
                       <table cellpadding='0' cellspacing='0' class='es-table-not-adapt es-social' role='presentation' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'> 
                         <tr style='border-collapse:collapse'> 
                          <td align='center' valign='top' style='padding:0;Margin:0;padding-right:10px'><a target='_blank' href='https://www.facebook.com/Tequilamandala/' style='-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFA73B;font-size:18px'><img title='Facebook' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAflBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////vroaSAAAAKXRSTlMAkPp3IfXWsjU6QDCtpgYE6ubAt3xjRO/hvJOGHQ/KoZfgioJxXVZTEyR+aTkAAAF3SURBVFjD7dTJkoIwFIXhAxiQWRAFRJynvP8Ldkm1dprkJnHngm+lleInXFJgMvl283Na+qz2y/Q8x8eiQ8EFxSH67OYll5T229imXCndWu5+wQkLq+dYuZzkrmDUca3OeH9uYNhDqNh/XSbJcle8niLUzl+eXxK+2q9J6t6F9P7Y7e9svN8mSDEfu0EO8BiUpbR/qAJLcoJ8bK4McGqOG+nkvZ9t5XnC6oYINONAQJQb2xHuMYi4iB5jxcccaqGCyp4KOMqtyVr7QAsV3z7gQ6W2D9RQYeKXY/b0wOAx/DkIywwqRzEASSIsH6GykwLkiHZQCfQBNjqispM2MOOCE1TWUoBa5WuoZEwIeE/r32ufv8UZsszmeyKfA+MX5W4buIPg2wV8UK52gSsouW8T8HOQYtcccGNoXMyBC7QCUyCAXhboA0EGi4IckK+n5Q4dcHLYiBp1oIlgqXeYHGBOD3u9V/wPFF6Pz+Rh1XYYdG0V5phMvtoPLiO0cVv8wQAAAAAASUVORK5CYII=' alt='Facebook' width='32' style='display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic'></a></td> 
                          <td align='center' valign='top' style='padding:0;Margin:0'><a target='_blank' href='https://www.instagram.com/tequilamandala/' style='-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFA73B;font-size:18px'><img title='Instagram' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAZlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Vn2moAAAAIXRSTlMA+vX899cBB+PLv7BBOyQh77dUE52ul2pmZEwcFYk1K4a1DhUtAAABwUlEQVRYw+yV6W6EIBCABy888Lbq3sv7v2RnSFloClpDmvTHfj8UMzI3A7x581+5rFOZ5l3EYvlFzKIuT8tpvcA+50JuUJxhm2spdyivsMEjl4aYJUkSRfjAYAz5Y8O+2s+qpW5GnoFFxsemXiqmNPh9UP5/tOCl/VBRePNH0htskd0k4stkQfbByzjcUQP5UHjqT/H7/b93Uk4YBeXB3Q8rSirw0ksEfajwtYKLCSULfIM3QjQcFKlEBoAFX5O3BrWdsKGKJBJVA5X0ictuBKi9dSATjfmsC6uDUTF/pj1GAA1+p+CCumgEzYlJC3YyxaBeAhcdSvhrv1SkfZ9KxUsDp1DABQWcaf/JfjyrorZzTD7UOjWUFnDBcIv+qSAzQksEOVdo5aiOgQNbMJB9YUSCfBhsQy7wnwQUqllmsJitJktwvaOAUzpasGgpcL6vgJKjS+1okl8rELjsf54Eoav1hwqSgBACkhhaxvBGCm/l8MMUfpzDB8r+SCNMkxwfqgY1VI+PdYMa68cvFoO5WPxXmx99tR2+XA2fA1eu5FfvDJDqndIGBu2aOJiNLCZsjSxKm3kUNjQpbeqOglEwSAEAdKtdR3vY+OMAAAAASUVORK5CYII=' alt='Instagram' width='32' style='display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic'></a></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table class='es-content' cellspacing='0' cellpadding='0' align='center' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%'> 
         <tr style='border-collapse:collapse'> 
          <td align='center' style='padding:0;Margin:0'> 
           <table class='es-content-body' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px' cellspacing='0' cellpadding='0' align='center'> 
             <tr style='border-collapse:collapse'> 
              <td align='left' style='Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px'> 
               <table width='100%' cellspacing='0' cellpadding='0' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'> 
                 <tr style='border-collapse:collapse'> 
                  <td valign='top' align='center' style='padding:0;Margin:0;width:560px'> 
                   <table width='100%' cellspacing='0' cellpadding='0' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'> 
                     <tr style='border-collapse:collapse'> 
                      <td align='center' style='padding:0;Margin:0;display:none'></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table></td> 
     </tr> 
   </table> 
  </div>  
 </body>
</html>
  ";

// response('Formulario enviado con exito.</br>En breve nos pondremos en contacto con usted', "ok",200, null);
  if (mail($to, $subject, $message, $headers)) {
    response('Form sent successfully. </br> We will contact you shortly', "ok", 200, null);
  } else {
    response('An error occurred. </br> Please try again later', "error", 400, true);
  };
// }else {
//   response('Datos Imcompletos. </br>Por favor revise y vuelva a intentarlo', "error", 400, true);
// }