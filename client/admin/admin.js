import './admin.html';
import { ReactiveVar } from 'meteor/reactive-var';
//import SITIO from '../../collections/cmscollections.js';
//myTemplates = new ReactiveVar();
//myTemplates.set("banneradmin

sitio = new ReactiveVar()///SITIO.find({titulo:titulo}));
//var site=[];

//console.log(site);
/*Template.admin.onCreated(function(){
	//var titulo = FlowRouter.getParam('titulo');	
	var row = SITIO.find().fetch();
	sitio.set(row);
	console.log(sitio.get())

});*/

Template.admin.helpers({
	/*templateadmin : function(){
		return myTemplates.get();
	}*/
	sitio: function () {
		//console.log(site);
		return SITIO.find().fetch()[0];
			
	},
});

Template.admin.events({
	'click #logout': function () {
		Meteor.logout();
	},
	'click #banner': function () {
		//myTemplates.set('banneradmin');
		FlowRouter.go('/admin/:titulo/banner',{titulo:FlowRouter.getParam('titulo')},{id:FlowRouter.getQueryParam('id')});
		
	},
	'click #navbar': function () {
		//myTemplates.set('navbaradmin');
		FlowRouter.go('/admin/:titulo/navbar',{titulo:FlowRouter.getParam('titulo')},{id:FlowRouter.getQueryParam('id'),});

	},
	'click #content': function () {
		//myTemplates.set('contentadmin');
		FlowRouter.go('/admin/:titulo/contenido',{titulo:FlowRouter.getParam('titulo')},{id:FlowRouter.getQueryParam('id')});
		
	},
	'click #nuevocont': function () {
		//myTemplates.set('nuevocont');
		FlowRouter.go('/admin/:titulo/contenido/nuevo',{titulo:FlowRouter.getParam('titulo')},{id:FlowRouter.getQueryParam('id')});
		
	},

	'click #sidebar': function () {
		//myTemplates.set('sidebaradmin');
		FlowRouter.go('/admin/:titulo/sidebar',{titulo:FlowRouter.getParam('titulo')},{id:FlowRouter.getQueryParam('id')});
		
	}
,	'click #footer': function () {
		//myTemplates.set('footeradmin');
		FlowRouter.go('/admin/:titulo/footer',{titulo:FlowRouter.getParam('titulo')},{id:FlowRouter.getQueryParam('id')});
		
	},
	'click #nuevomenu': function () {
		//myTemplates.set('nuevomenu');
		FlowRouter.go('/admin/:titulo/navbar/nuevo',{titulo:FlowRouter.getParam('titulo')},{id:FlowRouter.getQueryParam('id')});
		
	},
	'click #nuevomenuenlace': function () {
		//myTemplates.set('nuevomenu');
		FlowRouter.go('/admin/:titulo/sidebar/nuevomenuenlace',{titulo:FlowRouter.getParam('titulo')},{id:FlowRouter.getQueryParam('id')});
		
	},

});