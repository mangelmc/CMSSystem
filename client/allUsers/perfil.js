import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './perfil.html';	

Template.perfil.events({
	'submit #editForm': function (e) {
		e.preventDefault();
		if (e.target.username.value != Meteor.user().username || Meteor.userId() == undefined) {
			alert('Error al enviar el formulario... Vuelva a intentarlo mas tarde');
			return;
		}

		var obj = {
			"profile.name" : e.target.name.value,
			"profile.surname" : e.target.surname.value,
			"profile.carrera" : e.target.carrera.value,
		}

		Meteor.call('editUser', Meteor.userId(),obj, function (error, result) {
			if (result) {
				console.log(result);
			}
		});
		$('#editModal').modal('hide');

	},
	'submit #changePass': function (e) {
		e.preventDefault();
		if (e.target.password.value != e.target.repassword.value) {
			alert('Las contraseñas no coinciden');
			return;
		}

		Accounts.changePassword(e.target.oldpassword.value, e.target.password.value, function (error) {
			if (error) {
				alert('Contraseña actual incorrecta...!');
			}else{
				alert('Su contraseña se ha cambiado...!');
			}
		});
		$('#oldpassword').val('');
		$('#password').val('');
		$('#repassword').val('');
		$('#passModal').modal('hide');

	}
});