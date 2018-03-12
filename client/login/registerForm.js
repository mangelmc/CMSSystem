import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './registerForm.html';
import validar from '../validations.js';	

var loginForm = new ReactiveVar(false);
var regForm = new ReactiveVar(false	);
Template.registerForm.events({
	'click #loginForm': function () {
		setForm.set({temp:'registerForm',name:'Formulario de registro'});
	},
	'input #username': function (e) {
		//console.log(e.target.value);	
		var result = validar('usuario',e.target.value,'#alertusername');
		if (result == false) {
			regForm.set(false);
		}
		else{
			regForm.set(true);
		}
	},
	'input #password': function (e) {
		//console.log(e.target.value);	
		var result = validar('password',e.target.value,'#alertpassword');
		if (result == false) {
			regForm.set(false);
		}
		else{
			regForm.set(true);
		}
	},
	'input #re-password': function (e) {
		//console.log(e.target.value);	
		var result = validar('re-password',e.target.value,'#alertre-password');
		if (result == false) {
			regForm.set(false);
		}
		else{
			regForm.set(true);
		}
	},
	'input #name': function (e) {
		//console.log(e.target.value);	
		var result = validar('nombre',e.target.value,'#alertname');
		if (result == false) {
			regForm.set(false);
		}
		else{
			regForm.set(true);
		}
	},
	'input #surname': function (e) {
		//console.log(e.target.value);	
		var result = validar('apellidos',e.target.value,'#alersurname');
		if (result == false) {
			regForm.set(false);
		}
		else{
			regForm.set(true);
		}
	},
	'input #carrera': function (e) {
		//console.log(e.target.value);	
		var result = validar('carrera',e.target.value,'#alertcarrera');
		if (result == false) {
			regForm.set(false);
		}
		else{
			regForm.set(true);
		}
	},

	"submit form" : function(e){
		e.preventDefault();
		var user = e.target.user.value;
		if (loginForm.get() == false) {
			alert('texto invalido');
			return;
		}
	 	var user = {
			"username" : e.target.username.value,
			"email" : e.target.email.value,
			"password" : e.target.password.value,
			"profile" : {
				"name" : e.target.name.value,
				"surname" : e.target.surname.value,
				"carrera" : e.target.carrera.value,
				"online" : true,
				"bloqueado" : false,
				"img":'none'
				}
		};
		
	    if (user.username =='root' && user.email!='root@gmail.com') {
	        alert( 'correo no disponible');
			return;
	    }
	    if (user.username != 'root' && user.email == 'root@gmail.com') {
	         alert('usuario no disponible');
	         return;
	    }


		Accounts.createUser(user, function(e){
			if(e == undefined){
				//Meteor.loginWithPassword(user.username,user.password);
				//Roles.setUserRoles(Meteor.user()._id, ['estudiante'], 'user');
				//$(".panelForm").fadeOut('slow');
				setForm.set("loginForm");
				Meteor.call('checkLoginRoot', 1,function(error,result){
					if (result) {
						FlowRouter.go('/root');
					}
					return;
				});
				
				//FlowRouter.go('/');
			}else{
				alert(e.reason);
				//console.log(e);
				return;
			}							
		});

		$('#exampleModal').modal('hide');
		}	
});