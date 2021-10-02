<?php

require 'PHPMailerAutoload.php';

if ($_POST && $_FILES) {

  $nombre = $_POST['fullName'];
  $correo = $_POST['email'];
  $phone = $_POST['phone'];
  $idNumber = $_POST['idNumber'];
  $gender = $_POST['gender'];
  $interests = $_POST['interests'];
  $video = $_POST['video'];
  $attachment = $_FILES['attachment'];
  $mensaje = $_POST['comments'];

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
  $mail->Password = 'Nr3535';                           // SMTP password

  $mail->setFrom('no-reply@transdatos.com.ar', 'Transdatos Web');
  $mail->addAddress('busqueda-rrhh@transdatos.com.ar');       // Add a recipient

  $mail->addAttachment($attachment['tmp_name'], $attachment['name']);

  $mail->isHTML(true);                                  // Set email format to HTML

  $mail->Subject = 'Contacto desde Transdatos.com.ar! ' . $subject;
  $mail->Body    = '<p>Mensaje recibido desde la web:</p>' .
    '<strong>Nombre:</strong> ' . $nombre . '<br />' .
    '<strong>Correo:</strong> ' . $correo . '<br />' .
    '<strong>Phone:</strong> ' . $phone . '<br />' .
    '<strong>DNI:</strong> ' . $idNumber . '<br />' .
    '<strong>Genero:</strong> ' . $gender . '<br />' .
    '<strong>Area de Interes:</strong> ' . $interests . '<br />' .
    '<strong>CV, Portfolio o Demo Reel:</strong> ' . $video . '<br />' .
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
