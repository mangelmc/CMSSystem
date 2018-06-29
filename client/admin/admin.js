import './admin.html';
import { ReactiveVar } from 'meteor/reactive-var';
//import SITIO from '../../collections/cmscollections.js';
//myTemplates = new ReactiveVar();
//myTemplates.set("banneradmin

	///SITIO.find({titulo:titulo}));
//var site=[];

//console.log(site);
/*Template.admin.onCreated(function(){
	//var titulo = FlowRouter.getParam('titulo');	
	var row = SITIO.find().fetch();
	sitio.set(row);
	console.log(sitio.get())

});*/
sitioId = new ReactiveVar();
Template.welcomeAdmin.helpers({
	idSitio: function () {
		return FlowRouter.getParam('titulo');
	}
});
Template.adminMain.events({
	'click #logout': function () {
		Meteor.logout();
		FlowRouter.go('/');
	}
});

Template.admin.helpers({
	/*templateadmin : function(){
		return myTemplates.get();
	}*/
	sitio: function () {
		
		return SITIO.findOne();			
	},

});
Template.admin.onRendered(function(){
	this.autorun(function(){
		if (FlowRouter.subsReady("getSitio")) {
			sitioId.set(SITIO.findOne()._id);
		}
	});
	
})
Template.admin.events({
	'click #logout': function () {
		Meteor.logout();
		FlowRouter.go('/');
	},
	'click #header': function () {
		//myTemplates.set('banneradmin');
		FlowRouter.go('/admin/:titulo/header',{titulo:FlowRouter.getParam('titulo')},1);
		
	},
	'click #banner': function () {
		//myTemplates.set('banneradmin');
		FlowRouter.go('/admin/:titulo/banner',{titulo:FlowRouter.getParam('titulo')},1);
		
	},
	'click #navbar': function () {
		//myTemplates.set('navbaradmin');
		FlowRouter.go('/admin/:titulo/navbar',{titulo:FlowRouter.getParam('titulo')},1);

	},
	'click #content': function () {
		//myTemplates.set('contentadmin');
		FlowRouter.go('/admin/:titulo/menucontenido',{titulo:FlowRouter.getParam('titulo')},1);
		
	},
	'click #newcont': function () {
		//myTemplates.set('nuevocont');
		FlowRouter.go('/admin/:titulo/newcontenido/asdff',{titulo:FlowRouter.getParam('titulo')},1);
		
	},

	'click #sidebar': function () {
		//myTemplates.set('sidebaradmin');
		FlowRouter.go('/admin/:titulo/sidebar',{titulo:FlowRouter.getParam('titulo')},1);
		
	}
,	'click #footer': function () {
		//myTemplates.set('footeradmin');
		FlowRouter.go('/admin/:titulo/footer',{titulo:FlowRouter.getParam('titulo')},1);
		
	},
	'click #nuevomenu': function () {
		//myTemplates.set('nuevomenu');
		FlowRouter.go('/admin/:titulo/navbar/nuevo',{titulo:FlowRouter.getParam('titulo')},1);
		
	},
	'click #nuevomenuenlace': function () {
		//myTemplates.set('nuevomenu');
		FlowRouter.go('/admin/:titulo/sidebar/nuevomenuenlace',{titulo:FlowRouter.getParam('titulo')},1);
		
	},

});