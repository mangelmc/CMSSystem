import './sidebar.html';
import { ReactiveVar } from 'meteor/reactive-var';
var estadoSidebar = new ReactiveVar('Activo');

Template.sidebaradmin.helpers({
	listMenuEnlace: function () {
		return MENUENLACE.find({estado:estadoSidebar.get()});
	},
	estado:function	(){
		if (estadoSidebar.get()=='Activo') {
			return 'Activos'
		}
		return 'Inactivos';
	},
	sidebarActivo : function(){

		if (this.estado=='Activo') {
			return true
		}
		return false;
	},	
});

Template.sidebaradmin.events({
	'click #btnnuevomenu': function () {
		var carrera = FlowRouter.getParam('titulo');
		FlowRouter.go('/admin/:titulo/sidebar/nuevomenuenlace',{titulo:carrera},{id:FlowRouter.getQueryParam('id'),idmenuenlace:this._id});
		
	},
	'click .editsidebar': function () {
		
		var carrera = FlowRouter.getParam('titulo');
		FlowRouter.go('/admin/:titulo/sidebar/editarmenuenlace',{titulo:carrera},{id:FlowRouter.getQueryParam('id'),idmenuenlace:this._id});
		
	},
	'click .listactivos': function () {
		estadoSidebar.set('Activo');
	},
	'click .listinactivos': function () {
		estadoSidebar.set('Inactivo');
		
	},	
	'click .elisidebar': function () {
		//console.log(this);
		Meteor.call('darEstadoSidebar', this._id,'Inactivo', function (error, result) {});
	},	
	'click .restsidebar': function () {
		//console.log(this);
		Meteor.call('darEstadoSidebar', this._id,'Activo', function (error, result) {});
	},


});
Template.nuevomenuenlace.events({
	'submit #formmenuenlace': function (e) {
		e.preventDefault();
		var obj = {
			idSitio : FlowRouter.getQueryParam('id'),
			nombre : e.target.nombre.value,
		}
		//console.log(nombre);
		Meteor.call('insMenuEnlace', obj, function (error, result) {
			if (result) {
				var idSitio = FlowRouter.getQueryParam('id');

				var carrera = FlowRouter.getParam('titulo');
				FlowRouter.go('/admin/:titulo/sidebar/editarmenuenlace',{titulo:carrera},{id:idSitio,idmenuenlace:result});
				//console.log(carrera+'----'+idSitio);

			}
		});
		e.target.nombre.value = '';

	}
});
Template.editarmenuenlace.helpers({
	menuEnlace: function () {
		return MENUENLACE.findOne({_id:FlowRouter.getQueryParam('idmenuenlace')});	
	},
	listEnlaces : function(){
		//console.log(ENLACE.find().fetch());
		return ENLACE.find();
	}
});
Template.editarmenuenlace.events({
	'submit #formenlace': function (e) {
		e.preventDefault();
		var obj ={
			idSitio : FlowRouter.getQueryParam('id'),
			idMenu : e.target.idmenu.value,
			nombre : e.target.nombre.value,
			url : e.target.url.value
		};
		Meteor.call('insEnlace', obj, function (error, result) {
			if (result) {
				console.log(result);
			}
		});
		$('#formenlace')[0].reset();
		$('#contformenlace').slideToggle('slow');	
	},
	'click .mostrarcont': function () {
		
		$('#contformenlace').slideToggle('slow');
	},
	'click .cerrarcont': function () {
		$('#contformenlace').slideUp('slow');
	},
	'click .habedit': function () {
		$('#nombre').removeAttr('disabled');
		$('.habedit').fadeOut('slow',function(){
			$('.save').fadeIn('slow');	
		});
		

	},
	'submit #formeditmenu': function (e) {
		e.preventDefault();
		var nombre = e.target.nombre.value;
		var idMenu = e.target.idmenu.value;
		//
		Meteor.call('editmenuenlace', nombre,idMenu, function (error, result) {
		
			//alert('Se modifico');corregir return del server;
		});
		$('#nombre').attr('disabled','true');
		$('.save').fadeOut('slow',function(){
			$('.habedit').fadeIn('slow');	
		});
	},
	'click .pegar ': function () {
		var elem = $('#pegar');
		document.addEventListener('paste',function(){


		console.log(window.clipboardData.getData('Text'));	
		});

		//document.execCommand('Paste')
		//console.log(window.clipboardData.getData('Text'));
		//console.log('ok click')
	},
	'click .editenlace': function () {
		var titulo = FlowRouter.getParam('titulo');
		var idSitio = FlowRouter.getQueryParam('id');
		var idMenu = FlowRouter.getQueryParam('idmenuenlace');
		var idEnlace = this._id;
		FlowRouter.go('/admin/:titulo/sidebar/editarenlace',{titulo:titulo},{id:idSitio,idmenuenlace:idMenu,idEnlace:idEnlace});

	},
	'click .elienlace': function () {
		Meteor.call('eliEnlace', this._id, function (error, result) {});		
	},
	

});
Template.editarenlace.helpers({
	enlace: function () {
		return ENLACE.findOne({_id:FlowRouter.getQueryParam('idEnlace')});
	}
});
Template.editarenlace.events({
	'submit #formeditenlace': function (e) {
		e.preventDefault();
		var obj ={
			nombre : e.target.nombre.value,
			url : e.target.url.value
		};
		var idEnlace = e.target.idenlace.value;

		Meteor.call('editEnlace', obj,idEnlace, function (error, result) {

		});
		
		var titulo = FlowRouter.getParam('titulo');
		var idSitio = FlowRouter.getQueryParam('id');
		var idMenu = FlowRouter.getQueryParam('idmenuenlace');
		
		FlowRouter.go('/admin/:titulo/sidebar/editarmenuenlace',{titulo:titulo},{id:idSitio,idmenuenlace:idMenu});

	}
});