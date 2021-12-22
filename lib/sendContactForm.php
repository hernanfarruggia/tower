<?php

require 'PHPMailerAutoload.php';

$post = json_decode(file_get_contents('php://input'), true);

if ($post) {

  $nombre = $post['fullName'];
  $correo = $post['email'];
  $subject = $post['subject'];
  $mensaje = $post['message'];

  $mail = new PHPMailer;

  $mail->isSMTP();                                      // Set mailer to use SMTP
  $mail->SMTPAuth = true;                               // Enable SMTP authentication
  $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
  $mail->SMTPOptions = array(
    'ssl' => array(
      'verify_peer' => false,
      'verify_peer_name' => false,
      'allow_self_signed' => true
    )
  );
  $mail->Port = 465;                                    // TCP port to connect to
  $mail->Host = '200.47.45.14';                         // Specify main and backup SMTP servers
  $mail->Username = 'no-reply@transdatos.com.ar';       // SMTP username
  $mail->Password = '$$#NRTms2538#$$';                  // SMTP password

  $mail->setFrom('no-reply@transdatos.com.ar', 'Transdatos Web');
  $mail->addAddress('contacto@transdatos.com.ar');       // Add a recipient
  // $mail->addAddress('ceciliaf@transdatos.com.ar');
  // $mail->addAddress('afabbri@transdatos.com.ar');
  // $mail->addAddress('fsiri@transdatos.com.ar');

  $mail->isHTML(true);                                  // Set email format to HTML

  $mail->Subject = 'Contacto desde Transdatos.com.ar! ' . $subject;
  $mail->Body    = '<p>Mensaje recibido desde la web:</p>' .
    '<p><strong>Asunto:</strong> ' . $subject . '<br />' .
    '<strong>Nombre:</strong> ' . $nombre . '<br />' .
    '<strong>Correo:</strong> ' . $correo . '<br />' .
    '<strong>Mensaje:</strong> ' . $mensaje . '</p>';

  if(!$mail->send()) {
      $response = array('status' => false, 'statusText' => $mail->ErrorInfo);
  } else {
      $response = array('status' => true, 'statusText' => 'OK!');
  }

  echo json_encode($response);

} else {
  echo json_encode(array('status' => false, 'statusText' => 'No se encontraron parámetros'));
}

?>
