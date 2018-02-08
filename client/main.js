import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';	

title = new ReactiveVar('cmsSystem');
Template.maintemplate.helpers({
	title: function () {
		console.log(title.get());
		return title.get();
	},

});
Template.raiz.events({
	'click #cerrarsesion': function () {
		Meteor.logout();
	}
});