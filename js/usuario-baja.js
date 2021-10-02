/*
 * 
 * Modal envio form baja de usuario
 *
 */
window.onload = function(){

	//mostrando el formulario
    var menuBajaUsuario = document.getElementById("runDarDeBaja"); 
    menuBajaUsuario.onclick = function(){
        
    	var boxFijoFormulario = document.getElementsByClassName("modal-baja-usuario")[0]; 
    	boxFijoFormulario.style.display = "block"; 

    };

    //cerrando el formulario
    var menuCerrarBajaUsuario = document.getElementsByClassName("btn-cerrar-baja-usuario")[0];
    menuCerrarBajaUsuario.onclick = function(){

    	var boxFijoFormulario = document.getElementsByClassName("modal-baja-usuario")[0]; 
    	boxFijoFormulario.style.display = "none"; 

    }

    var formularioBajaCliente = document.getElementById("formularioBajaCliente"); 
    formularioBajaCliente.addEventListener("submit", enviandoFormularioBaja); 
 
}

function enviandoFormularioBaja(e){

	e.preventDefault(); 

	var xhr = new XMLHttpRequest(); 

	xhr.open("POST", "lib/enviandoBajaUsuario.php");

	var obj_form = {
		'nombreApellidoSolicitante': document.getElementById("nombreSolicitante").value,
		'nombreApellidoCliente': document.getElementById("nombreCliente").value,
		'razonSocial': document.getElementById("razonSocial").value,
		'domicilio': document.getElementById("domicilio").value,
		'telefono': document.getElementById("telefono").value,
		'email': document.getElementById("email").value
	};

	if(obj_form.nombreApellidoSolicitante != '' && obj_form.domicilio != '' && obj_form.telefono != '' && obj_form.email != ''){

		let json_preparado = "json_baja_usuario=" + JSON.stringify(obj_form); 

		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); 
		xhr.send(json_preparado); 

		xhr.onreadystatechange = function(){
			if(xhr.status == 200){
				document.getElementById("formularioBajaCliente").style.display = "none";
				document.getElementsByClassName("texto-baja-correcta")[0].style.display = "block";
			}
		};

	}

	//alert("Hola"); 

	return false; 

}