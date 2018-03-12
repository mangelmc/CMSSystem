import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './mainLogin.html';

setForm = new ReactiveVar({temp:'loginForm',name:'Formulario de inicio de sesion'})

Template.mainLogin.helpers({
	login: function () {
		return	setForm.get();
	}
});
Template.mainLogin.events({
	'click #login': function () {
		
	}
});	