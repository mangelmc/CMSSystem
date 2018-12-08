import {
	Template
} from 'meteor/templating';
import {
	ReactiveVar
} from 'meteor/reactive-var';

import './loginForm.html';
import validar from '../validations.js';

var loginForm = {};
loginForm.user = new ReactiveVar(false);
loginForm.password = new ReactiveVar(false);

new ReactiveVar(false);
Template.loginForm.events({
	'click #regform': function () {
		setForm.set({
			temp: 'registerForm',
			name: 'Formulario de Registro'
		});
	},
	'input #nombre': function (e) {

		/*var ok = validar('personal',e.target.value,'#nombre');
		if (ok == false) {
			$('#carrera').val(e.target.value.slice(0,-1));
			return;
		}*/
	},
	'input #user': function (e) {
		//console.log(e.target.value);	
		var result = validar('usuario', e.target.value, '#alertuser');
		if (result == false) {
			loginForm.user.set(false);
		} else {
			loginForm.user.set(true);
		}
	},
	'input #password': function (e) {
		//console.log(e.target.value);	
		var result = validar('password', e.target.value, '#alertpassword');
		if (result == false) {
			loginForm.password.set(false);
		} else {
			loginForm.password.set(true);
		}
	},

	"submit #login": function (e) {
		e.preventDefault();

		var user = e.target.user.value;
		var password = e.target.password.value;
		if (loginForm.user.get() == false || loginForm.password.get() == false) {
			alert('Debe arreglar lo errores del formulario');
			return;
		}
		Meteor.call('getServerTime', function (error, result) {
			//console.log(result || error);
			if (error) {
				alert('Hubo un error por favor recargue la pagina e intente nuevamente :´(');
				return;
			}

			const time = result;
			//console.log('Realserver', +time);

			let localTime = +localStorage.getItem("userTime");

			let limitTime = +time - 60000 * 10; //10min
			let userCount = +localStorage.getItem("userCount");

			//console.log(+localTime <= +time - 60000 * 10);

			if (userCount == 0 || +localTime <= limitTime) {
				//console.log('clean');
				localStorage.removeItem("userCount");
				localStorage.setItem("userTime", +time);
			}

			if (userCount > 2) {
				/* console.log('local', new Date(localTime));

				console.log('server', new Date(+time));
				console.log('limit', new Date(limitTime)); */

				if (limitTime >= localTime) {
					//console.log('ok time lapsed');
					localStorage.removeItem("userTime");
					localStorage.removeItem("userCount");
				} else {
					let intent = localTime - limitTime;
					//console.log('mmmmm buggy', intent);
					if (intent <= 60000) {
						alert('vuelva a intentarlo en ' + Math.floor(intent / 1000) + ' Segundos');
					} else {
						alert('vuelva a intentarlo en ' + Math.floor(intent / 60000) + ' Minutos');
					}
					return;
				}
			}
			//console.log(user, password);
			/////lgin
			Meteor.loginWithPassword(user, password, function (err, result) {
				if (err) {
					alert('"Usuario"/"email"  y/o  contraseña incorrectos...!');

					let count = localStorage.getItem("userCount");
					//console.log(count);
					if (count == null) {
						localStorage.setItem("userCount", 1);
						//console.log('added');
					} else {
						if (+count >= 3) {
							localStorage.setItem("userTime", +time);
							//console.log('setTime', +time);
						} else {
							localStorage.setItem("userCount", +count + 1);
							//console.log('increased', +count + 1);
						}
					}
				} else {
					Meteor.call('checkBan', 1, function (error, result) {
						if (result == true) {
							alert('Oops...Tu cuenta esta bloqueada temporalmente');
							Meteor.logout();
						} else {
							Meteor.call('checkLoginRol', 1, function (error, result) {
								if (result) {
									$('#exampleModal').modal('hide');
									if (result.tipo == 'normal') {
										FlowRouter.go('/')
									}
									if (result.tipo == 'admin') {
										FlowRouter.go('/admin');
									}
									if (result.tipo == 'root') {
										FlowRouter.go('/root');
									}
								}
							});
						}
					});
				}
			});

		});


		setForm.set({
			temp: 'loginForm',
			name: 'Formulario de inicio de sesion'
		});
		e.target.user.value = '';
		e.target.password.value = '';
	},
	'click .modaldes': function () {
		$('#exampleModal').modal('hide');
	}
});