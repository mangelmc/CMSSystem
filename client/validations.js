export default function validar (tipo,texto) {
	if (tipo == 'personal') {
		//var test = texto.test(^[a-z]$);
		if (test == true) {
			return true
		}
		return false
	}
	if (tipo == 'email') {
		//var test = texto.test(^[a-z]@$);
		if (test == true) {
			return true
		}
		return false
	}
}

