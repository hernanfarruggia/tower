<?php 

	require 'class.phpmailer.php';

	$send_email = new  phpmailer(); 

	if(isset($_POST['json_baja_usuario'])){

		$data_baja = json_decode($_POST['json_baja_usuario']); 

		$nombre_apellido_solicitante = $data_baja->nombreApellidoSolicitante; 
		$nombre_apellido_cliente 	 = (isset($data_baja->nombreApellidoCliente)) ? $data_baja->nombreApellidoCliente : 'El cliente es el solicitante';
		$numero_cliente 	 		 = (isset($data_baja->numeroCliente)) ? $data_baja->numeroCliente : 'El usuario no informo numero de cliente'; 
		$razon_social 				 = (isset($data_baja->razonSocial)) ? $data_baja->razonSocial : 'Este usuario no es una empresa'; 
		$domicilio 					 = (isset($data_baja->domicilio)) ? $data_baja->domicilio : 'El usuario no informo domicilio';
		$telefono 					 = (isset($data_baja->telefono)) ? $data_baja->telefono : 'El usuario no informo un teléfono'; 
		$email 						 = (isset($data_baja->email)) ? $data_baja->email : 'El usuario no informo email'; 

		$mensaje = "
			<h1 style='color:#1980ad;float:left;width:100%;text-align:center;'>Solicitud de dar de baja cliente.</h1>"
			."<p style='text-decoration:underline;'>Información de la solicitud de baja de usuario:</p>"
			."<p><strong>Nombre y apellido del solicitante:</strong> ".$nombre_apellido_solicitante."</p>"
			."<p><strong>Nombre y apellido del cliente:</strong> ".$nombre_apellido_cliente."</p>"
			."<p><strong>Número del cliente:</strong> ".$numero_cliente."</p>"
			."<p><strong>Razón social:</strong> ".$razon_social."</p>"
			."<p><strong>Domicilio:</strong> ".$domicilio."</p>"
			."<p><strong>Teléfono:</strong> ".$telefono."</p>"
			."<p><strong>Email:</strong> ".$email."</p>"
		;

		 /* $send_email->isSMTP();                                      // Set mailer to use SMTP
		  $send_email->SMTPAuth = true;                               // Enable SMTP authentication
		  $send_email->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
		  $send_email->SMTPOptions = array(
		    'ssl' => array(
		      'verify_peer' => false,
		      'verify_peer_name' => false,
		      'allow_self_signed' => true
		    )
		  );
		  $send_email->Port = 465;                                    // TCP port to connect to
		  $send_email->Host = '200.47.45.14';                         // Specify main and backup SMTP servers
		  $send_email->Username = 'no-reply@transdatos.com.ar';       // SMTP username
		  $send_email->Password = 'Nr3535';                           // SMTP password*/

		$send_email->setFrom('no-reply@transdatos.com.ar', 'Transdatos Web');
		$send_email->AddAddress('consultasinternet@transdatos.com.ar');
		$send_email->Subject = 'Solicitud de dar de baja usuario';
		$send_email->msgHTML($mensaje);

		if($send_email->send()){

			$data = array(
				'status' => 'success',
				'code' => 200,
				'msj' => 'Mensaje enviado correctamente'
			);
			$json = json_encode($data);
			echo $data; 

		}else{

			$data = array(
				'status' => 'error',
				'code' => 400,
				'msj' => 'Mensaje no enviado'
			);
			$json = json_encode($data);
			echo $data; 

		}
	}
?>