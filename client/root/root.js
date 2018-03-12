import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


import './root.html' ;

Template.root.events({
	'click #logout': function () {
		Meteor.logout();
	}
});