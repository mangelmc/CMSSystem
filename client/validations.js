export default function validar (tipo,texto,tag) {
	var test = false;
	if (tipo == 'carrera') {
		test = /^([a-zA-Z\s-]{1,30})$/.test(texto);
		if (test == true) {
			$(tag).slideUp('slow').text('ok');
			return true
		}
		$(tag).slideDown('slow').text('texto no valido');
		return false
	}
	if (tipo == 'email') {
		test = /^[a-z]{4,12}[@]{1}[a-z]{2,10}[.]{1}[a-z]{2,5}$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text('email erroneo');
		return false
	}
	if (tipo == 'nombre') {
		test = /^[a-zA-Z]{3,12}$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text('nombre erroneo');
		return false  
	}

   /*para loginform validation*/

    if (tipo == 'usuario') {
		test = /^([a-zA-Z\s-]{1,10})$/.test(texto);
		if (test == true) {
			$(tag).slideUp('slow').text('ok');
			return true
		}
		$(tag).slideDown('slow').text('texto no valido');
		return false
	}
	if (tipo == 'password') {
		test = /^([a-zA-Z\s-]{1,10})$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text(' erroneo');
		return false
	}

	/*para registerfrom validation*/

	 if (tipo == 'Usuario') {
		test = /^([a-zA-Z\s-]{1,10})$/.test(texto);
		if (test == true) {
			$(tag).slideUp('slow').text('ok');
			return true
		}
		$(tag).slideDown('slow').text('texto no valido');
		return false
	}
	if (tipo == 'password') {
		test = /^[0-9	]{0,12}$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text(' erroneo');
		return false
	}
	 if (tipo == 're-password') {
		test = /^([a-zA-Z\s-]{1,30})$/.test(texto);
		if (test == true) {
			$(tag).slideUp('slow').text('ok');
			return true
		}
		$(tag).slideDown('slow').text('texto no valido');
		return false
	}
	if (tipo == 'email') {
		test = /^[0-9	]{0,12}$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text(' erroneo');
		return false
	}
	 if (tipo == 'nombre') {
		test = /^([a-zA-Z\s-]{1,30})$/.test(texto);
		if (test == true) {
			$(tag).slideUp('slow').text('ok');
			return true
		}
		$(tag).slideDown('slow').text('texto no valido');
		return false
	}
	if (tipo == 'apellidos') {
		test = /^([a-zA-Z\s-]{1,30})$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text(' erroneo');
		return false
	}
	if (tipo == 'carrera') {
		test = /^([a-zA-Z\s-]{1,30})$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text(' erroneo');
		return false
	}
	/*validation para la administracion del sitio web*/
	if (tipo == 'Usuario') {
		test = /^([a-zA-Z\s-]{1,10})$/.test(texto);
		if (test == true) {
			$(tag).slideUp('slow').text('ok');
			return true
		}
		$(tag).slideDown('slow').text('texto no valido');
		return false
	}
	if (tipo == 'password') {
		test = /^[0-9	]{0,12}$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text(' erroneo');
		return false
	}
	 if (tipo == 're-password') {
		test = /^([a-zA-Z\s-]{1,30})$/.test(texto);
		if (test == true) {
			$(tag).slideUp('slow').text('ok');
			return true
		}
		$(tag).slideDown('slow').text('texto no valido');
		return false
	}
	if (tipo == 'email') {
		test = /^[0-9	]{0,12}$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text(' erroneo');
		return false
	}
	 if (tipo == 'nombre') {
		test = /^([a-zA-Z\s-]{1,30})$/.test(texto);
		if (test == true) {
			$(tag).slideUp('slow').text('ok');
			return true
		}
		$(tag).slideDown('slow').text('texto no valido');
		return false
	}
	if (tipo == 'apellidos') {
		test = /^([a-zA-Z\s-]{1,30})$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text(' erroneo');
		return false
	}
	if (tipo == 'carrera') {
		test = /^([a-zA-Z\s-]{1,30})$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text(' erroneo');
		return false
	}

		/*validation BANNER */

	if (tipo == 'titulositio') {
		test = /^([a-zA-Z\s-]{1,30})$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text(' erroneo');
		return false
	}
	if (tipo == 'subtitulositio') {
		test = /^([a-zA-Z\s-]{1,30})$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text(' erroneo');
		return false

  }
   /*validations nuevo menu */
   if (tipo == 'nombre') {
		test = /^([a-zA-Z\s-]{1,30})$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text(' erroneo');
		return false
	}
	if (tipo == 'link') {
		test = /^([a-zA-Z\s-]{1,30})$/.test(texto);
		if (test == true) {

			$(tag).slideUp('slow').text('ok');
			return true;
		}
		$(tag).slideDown('slow').text(' erroneo');
		return false

  }
  /*validations para sidebar*/
   
};