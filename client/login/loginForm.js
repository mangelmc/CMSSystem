import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './loginForm.html';	


Template.loginForm.events({
	'click #regform': function () {
		setForm.set({temp:'registerForm',name:'Formulario de Registro'});
	},

	"submit #login" : function(e){
		e.preventDefault();
		var user = e.target.user.value;

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
							
							FlowRouter.go('/admin/:titulo',{titulo:result.titulo},{id:result.idSitio});
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
		
		e.target.user.value='';e.target.password.value='';
		
		return false;
	},
	'click .modaldes': function () {
		$('#exampleModal').modal('hide');
	}
});