import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './registerForm.html';	

Template.registerForm.events({
	'click #loginform': function () {
		setForm.set({temp:'loginForm',name:'Formulario de Inicio de Sesion'});
	},
	"submit form" : function(e){
		e.preventDefault();
		if (e.target.password.value!=e.target.repassword.value) {
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