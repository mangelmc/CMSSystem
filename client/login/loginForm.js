import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './loginForm.html';	
import validar from '../validations.js';

var loginForm = {};
loginForm.user = new ReactiveVar(false);
loginForm.password = new ReactiveVar(false);

new ReactiveVar(false);
Template.loginForm.events({
	'click #regform': function () {
		setForm.set({temp:'registerForm',name:'Formulario de Registro'});
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
		var result = validar('usuario',e.target.value,'#alertuser');
		if (result == false) {
			loginForm.user.set(false);
		}
		else{
			loginForm.user.set(true);
		}
	},
	'input #password': function (e) {
		//console.log(e.target.value);	
		var result = validar('password',e.target.value,'#alertpassword');
		if (result == false) {
			loginForm.password.set(false);
		}
		else{
			loginForm.password.set(true);
		}
	},

	"submit #login" : function(e){
		e.preventDefault();
		var user = e.target.user.value;
		if (loginForm.user.get() == false||loginForm.password.get() == false) {
			alert('Debe arreglar lo errores del formulario');
			return;
		}
		Meteor.loginWithPassword(user,e.target.password.value,function(err,result){
			if (err) {
				//console.log('error : '+err);
				alert('"Usuario"/"email"  y/o  contraseña incorrectos...!');
				
			}else{
				/*Meteor.call('checkBan', user, function (error, result) {
					if (result==true) {
						alert('Oops...Tu cuenta esta bloqueada temporalmente');
						Meteor.logout();
						
					}
					else{
						FlowRouter.go('/cursos');
						
						//Meteor.call('setOnOffLine', true);
					}
				});*/
				
				Meteor.call('checkRol', 1, function (error, result) {
					if (result) {
						if (result.tipo=='normal') {
							$('closemodal').click();
							return;
						}
						if (result.tipo=='admin') {
							
							FlowRouter.go('/admin');
							$('closemodal').click();
							
							return;
						}
						if (result.tipo=='root') {
							FlowRouter.go('/root');
							$('closemodal').click();
							return;
						}
						//$('#closemodal1').click();
						
						console.log('no return');
					}
				});
				
			}
		});
		$('#exampleModal').modal('hide');
		setForm.set({temp:'loginForm',name:'Formulario de inicio de sesion'});
		
		e.target.user.value='';e.target.password.value='';
		
		return false;
	},
	'click .modaldes': function () {
		$('#exampleModal').modal('hide');
	}
});