import	'./usuarios.html';

import { ReactiveVar } from 'meteor/reactive-var';
import validar from '../validations.js';

var emailForm = new ReactiveVar(true);
var nameForm = new ReactiveVar(true);
var surnameForm = new ReactiveVar(true);
var careerForm = new ReactiveVar(true);

var passChangeForm = new ReactiveVar(false);
var repassChangeForm = new ReactiveVar(false);


Template.usuarios.onCreated(function(){
	this.idUser = new ReactiveVar('none');
	this.locked = new ReactiveVar(false);
})
Template.usuarios.helpers({
	listUsers: function () {
		return	Accounts.users.find({"profile.bloqueado":Template.instance().locked.get()});
	},
	registro : function(){
		var fecha = this.createdAt;
        //console.log(fecha);
        if (fecha != undefined)  {
	        var options ={
	            weekday:'long',year:'numeric',month:'long',day:'numeric'
	        }

	        fecha = fecha.toLocaleDateString('es-ES',options);
	        return fecha;
	    }
	},
	next:function(index){
		//console.log(index);
		var i = index+1;
		return i;
	},
	options : function(){
		
		return '<option value="normal">normal</option>' +
				'<option value="admin">admin</option>' +
				'<option value="root">root</option>';
	},
	isRoot : function(){
		if (this.username == 'root' && Roles.userIsInRole(Meteor.userId(),['root'])) {
			return true;
		}
		return false;
	},
	isBanned : function(){
		if (this.profile.bloqueado == true) {
			return true;
		}
		return false;
	},
	infoEmpty : function(){
		if (Template.instance().locked.get() == true) {
			return 'BLOQUEADOS';
		}
		return 'ACTIVOS';
	}
});

Template.usuarios.events({
	'click #usuarios': function (e) {
		Template.instance().locked.set(false);
	},
	'click #usuariosb': function (e) {
		Template.instance().locked.set(true);
	},
	'change .changerol': function (e) {
		var res = confirm('Esta seguro de cambiar el rol del usuario ' + this.username + ' ?');
		if (res) {
			
			Meteor.call('changeRol',  e.target.value, this._id, function (error, result) {
				if (result) {
					sAlert.info('Se modifico el Rol de Usuario', {effect: 'slide',offset: '130'});
				}
			});
		}
	},
	'click .banuser': function () {
		var res =  confirm('esta seguro de banear al usuario '+ this.username + '?');
		if (res == true) {
			Meteor.call('editUser', this._id,{"profile.bloqueado":true}, function (error, result) {
				if (result) {
				sAlert.info('Se baneó al usuario', {effect: 'slide',offset: '130'});
				}
			});
		}		
	},
	'click .restuser': function () {
		var res =  confirm('esta seguro de restaurar al usuario '+ this.username + '?');
		if (res == true) {
			Meteor.call('editUser', this._id,{"profile.bloqueado":false}, function (error, result) {
				if (result) {
				sAlert.info('Se desbloqueo al usuario', {effect: 'slide',offset: '130'});
				}
			});
		}
	},
	'click .edituser': function () {
		Template.instance().idUser.set(this._id);
		$('#usernameedit').val(this.username);
		$('#emailedit').val(this.emails[0].address);
		$('#nameedit').val(this.profile.name);
		$('#surnameedit').val(this.profile.surname);
		$('#carreraedit').val(this.profile.carrera);
		emailForm.set(true); nameForm.set(true); surnameForm.set(true); careerForm.set(true);
		$('#alertemailedit,#alertnameedit,#alertsurnameedit,#alertcarreraedit').css('display', 'none');
		//aui falta edicion de avatar
		//console.log(Template.instance().idUser.get());
		$('#modalEdit').modal('show');
	},
	'click .changepass': function (e,) {
		$('#usernamechange').val(this.username);
		Template.instance().idUser.set(this._id);
		$('#modalChangePass').modal('show');
	},
	'input #passwordchange': function (e) {
		var result = validar('password',e.target.value,'#alertpasswordc');
		if (result == false) {
			passChangeForm.set(false);
		}
		else{
			passChangeForm.set(true);
		}
	},
	'input #repasswordchange': function (e) {
		var result = validar('password',e.target.value,'#alertrepasswordc');
		if (result == false) {
			repassChangeForm.set(false);
		}
		else{
			repassChangeForm.set(true);
		}
	},
	
	'submit #changePassForm': function (e) {
		e.preventDefault();

		if (!passChangeForm.get() || !repassChangeForm.get()) {
			alert('Debe arreglar los errores en el formulario');return;
		}
		if (e.target.password.value != e.target.repassword.value) {
			alert('Las contraseñas no coinciden');
			return;
		}
		//console.log(Template.instance().idUser.get());return;
		Meteor.call('setNewPassword', Template.instance().idUser.get(), e.target.password.value, function (error, result) {
			if (result) {
				sAlert.info('Se modifico la contraseña', {effect: 'slide',offset: '130'});
			}
		});
		Template.instance().idUser.set('none');
		$('#changePassForm')[0].reset();
		$('#modalChangePass').modal('hide');
	},

	'input #emailedit': function (e) {
		//console.log(e.target.value);	
		var result = validar('email',e.target.value,'#alertemailedit');
		if (result == false) {
			emailForm.set(false);
		}
		else{
			emailForm.set(true);
		}
	},
	'input #nameedit': function (e) {
		//console.log(e.target.value);	
		var result = validar('nombre',e.target.value,'#alertnameedit');
		if (result == false) {
			nameForm.set(false);
		}
		else{
			nameForm.set(true);
		}
	},
	'input #surnameedit': function (e) {
		
		var result = validar('nombre',e.target.value,'#alertsurnameedit');

		if (result == false) {
			surnameForm.set(false);
		}
		else{
			surnameForm.set(true);
		}
	},
	'input #carreraedit': function (e) {
		//console.log(e.target.value);	
		var result = validar('carrera',e.target.value,'#alertcarreraedit');
		if (result == false) {
			careerForm.set(false);
		}
		else{
			careerForm.set(true);
		}
	},
	'submit #editUserForm': function (e) {
		e.preventDefault();
		if (!emailForm.get() || !nameForm.get() || !surnameForm.get() || !careerForm.get()) {
			alert('Debe arreglar los errores en el formulario');return;
		}
		var obj = {
			'emails[0].address' : e.target.email.value,
			'profile.name' : e.target.name.value,
			'profile.surname' : e.target.surname.value,
			'profile.carrera' : e.target.carrerae.value,
		}
		var idUser = Template.instance().idUser.get();
		//console.log(idUser);
		Meteor.call('editUser', idUser, obj, function (error, result) {
			if (result) {
				
				sAlert.info('Se modifico la info de Usuario', {effect: 'slide',offset: '130'});
			}
		});
		Template.instance().idUser.set('none');
		$('#modalEdit').modal('hide');
	}
});


