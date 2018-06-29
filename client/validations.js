
export default function validar (tipo,texto,tag) {
	var test = false;
	
	if (tipo == 'email') {
		test = /^[a-z\_\-0-9]{4,12}[@]{1}[a-z]{2,10}[.]{1}[a-z]{2,5}$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text('email erroneo');
		return false
	}

	if (tipo == 'nombre') {
		test = /^[a-zA-ZñÑ]{3,12}(\s[a-zA-ZñÑ]{3,12})?$/.test(texto);//tambien valido para carrera
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text('Solo caracteres del Alfabeto');
		return false  
	}

   /*para loginform validation*/

    if (tipo == 'usuario') {
		test = /^([a-zA-Z0-9_-]{3,10})$/.test(texto);
		if (test == true) {
			$(tag).slideUp('slow').text('ok');
			return true
		}
		$(tag).slideDown('slow').text('Minimo 3 caracteres alfanumericos');
		return false
	}
	if (tipo == 'password') {
		test = /^[A-Za-z0-9_#!%&/=?¡¿.-]{6,12}$/.test(texto);
		//(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text('De 6 a 12 caracteres especiales y/o alfanumericos ');
		return false
	}
	if (tipo == 'carrera') {
		test = /^[A-Za-z0-9_-\s]{3,30}$/.test(texto);
		//(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text('De 3 a 30 caracteres alfanumericos,"-" y "_" ');
		return false
	}
	if (tipo == 'url') {
		test = /^(http|https):\/\/[A-Za-z0-9\.\-\#\=\_\&\/\+\?]{4,100}$/.test(texto);//(http|https)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}
		if (test == true) {
			
			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text('Debe ingresar http(s):// mas un dominio valido');
		return false
	}
	//titulo o subtitulo de sitio
	if (tipo == 'titulo') {

		test = /^([a-zA-Z0-9\s_.-]{1,30})$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text(' erroneo');
		return false
  	}
  	//dominio
  	if (tipo == 'dominio') {

		test = /^([a-z0-9.-]{4,30})$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text('De 4 a 30 carcteres entre -,., minusculas y numeros');
		return false
  	}
  	if (tipo == 'link') {

		test = /^([a-z0-9.-]{4,30})$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text('De 4 a 30 carcteres entre -,., minusculas y numeros');
		return false
  	}
	
	
   
};

