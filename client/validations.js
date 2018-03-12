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
	if (tipo == 'titulo') {
		test = /^([a-z.-]{1,30})$/.test(texto);
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
}

