import { Template } from 'meteor/templating';


import './root.html' ;

Template.root.events({
	'click #logout': function () {
		Meteor.logout();
		FlowRouter.go('/');
	}
});
