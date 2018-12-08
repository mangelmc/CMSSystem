import {
	Template
} from 'meteor/templating';
import {
	ReactiveVar
} from 'meteor/reactive-var';

import './registerForm.html';
import validar from '../validations.js';


var userForm = new ReactiveVar(false);
var passForm = new ReactiveVar(false);
var emailForm = new ReactiveVar(false);
var nameForm = new ReactiveVar(false);
var surnameForm = new ReactiveVar(false);
var careerForm = new ReactiveVar(false);

var captchaCheck = new ReactiveVar(false);

Meteor.startup(function () {
	reCAPTCHA.config({
		publickey: '6Lch5V0UAAAAALZvbn-SHfEmvyNhvJwUYYzoP2GX',
		//hl: 'ja' // optional display language
	});
});

Template.registerForm.events({
	'click #loginform': function () {
		setForm.set({
			temp: 'loginForm',
			name: 'Formulario de inicio de Sesion'
		});
	},
	'input #username': function (e) {
		//console.log(e.target.value);	
		var result = validar('usuario', e.target.value, '#alertusername');
		if (result == false) {
			userForm.set(false);
		} else {
			userForm.set(true);
		}
	},
	'input #password': function (e) {
		//console.log(e.target.value);	
		var result = validar('password', e.target.value, '#alertpassword');
		if (result == false) {
			passForm.set(false);
		} else {
			passForm.set(true);
		}
	},
	'input #repassword': function (e) {
		//console.log(e.target.value);	
		var result = validar('password', e.target.value, '#alertrepassword');
		if (result == false) {
			passForm.set(false);
		} else {
			passForm.set(true);
		}
	},
	'input #email': function (e) {
		//console.log(e.target.value);	
		var result = validar('email', e.target.value, '#alertemail');
		if (result == false) {
			emailForm.set(false);
		} else {
			emailForm.set(true);
		}
	},
	'input #name': function (e) {
		//console.log(e.target.value);	
		var result = validar('nombre', e.target.value, '#alertname');
		if (result == false) {
			nameForm.set(false);
		} else {
			nameForm.set(true);
		}
	},
	'input #surname': function (e) {

		var result = validar('nombre', e.target.value, '#alertsurname');

		if (result == false) {
			surnameForm.set(false);
		} else {
			surnameForm.set(true);
		}
	},
	'input #carrera': function (e) {
		//console.log(e.target.value);	
		var result = validar('carrera', e.target.value, '#alertcarrera');
		if (result == false) {
			careerForm.set(false);
		} else {
			careerForm.set(true);
		}
	},

	"submit form": function (e) {
		e.preventDefault();

		function callMeteorMethod(methodName, data) {
			return new Promise((resolve, reject) => {
				Meteor.call(methodName, data, (error, result) => {
					if (error) reject(error)
					else resolve(result)
				})
			})
		}
		var captchaData = grecaptcha.getResponse();
		if (captchaData == "") {
			alert("Por favor verifique el reCaptcha");
			return;
		}

		async function main() {
			let result = await callMeteorMethod('checkCaptcha', captchaData)
			//console.log(result)
		}
		var res = main();

		if (res == false) {
			alert("error de verificacion de captchaCheck intente nuevamnete");
		}

		if (userForm.get() == false || emailForm.get() == false || nameForm.get() == false || surnameForm.get() == false || careerForm.get() == false || passForm.get() == false) {
			alert('Debe Arreglar los errores del Formulario');
			return;
		}


		var user = {
			"username": e.target.username.value,
			"email": e.target.email.value,
			"password": e.target.password.value,
			"profile": {
				"name": e.target.name.value,
				"surname": e.target.surname.value,
				"carrera": e.target.carrera.value,
				"online": true,
				"bloqueado": false,
				"img": 'none'
			}
		};
		if (user.password != e.target.repassword.value) {
			alert('Las contraseñas no coinciden');
			return;
		}
		if (user.username == 'root' && user.email != 'root@gmail.com') {
			alert('correo no disponible');
			return;
		}
		if (user.username != 'root' && user.email == 'root@gmail.com') {
			alert('usuario no disponible');
			return;
		}


		Accounts.createUser(user, function (e) {
			if (e == undefined) {
				Meteor.loginWithPassword(user.username, user.password);


				if (user.username != 'root') {
					Meteor.call('setRolNormal', Meteor.userId());
				} else {
					Meteor.call('checkLoginRoot', function (error, result) {
						if (result) {
							FlowRouter.go('/root');
						}
						return;
					});
				}
				setForm.set({
					temp: 'loginForm',
					name: 'Formulario de inicio de sesion'
				});
			} else {
				alert(e.reason);
				return;
			}
		});

		$('#exampleModal').modal('hide');
	}
});