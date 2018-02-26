import './navbar.html';
import { ReactiveVar } from 'meteor/reactive-var';
var estadoMenu = new ReactiveVar('activo');
Template.navbaradmin.onRendered(function() {

})
Template.navbaradmin.helpers({
	color : function(){

	},
	listMenu : function(){
		return MENU.find({estado:estadoMenu.get()});
	},
	
	estiloNavbar : function(){
		var id = FlowRouter.getQueryParam('id');
		if (NAVBAR.findOne({idSitio:id})!=undefined) {
			var estilo = NAVBAR.findOne({idSitio:id});
			$('#bannerestilo').css({
				'background-color': estilo.color,
				'font-family': estilo.fuente
			});
			$('#color option[value="'+estilo.color+'"]').prop('selected', true);
			$('#fuente option[value="'+estilo.fuente+'"]').prop('selected', true);


			//alert('load');
		}
		return true;			
		
	},
	activo : function(){
		//console.log();
		if (this.estado=='activo') {
			return	true;
		}
		return false;
	},
	estado : function(){
		if (estadoMenu.get()=='activo') {
			return {texto:'ACTIVOS'};
		}
		return {texto:'INACTIVOS'};
	},
	submenu : function(){
		//console.log(this);
		if (this.tipo=='con submenu') {
			return	true;
		}
		return false;
	},
	listSubmenu : function(){
		//console.log(this);
		return SUBMENU.find({idMenu : this._id});
	},
	subActivo : function(){
		//console.log();
		if (this.estado=='Activo') {
			return	true;
		}
		return false;
	},

});
function link(string,iddestino){
	var link = string.trim().split(" ").join("-");
		
		$(''+iddestino).val(link.toLowerCase());
};
Template.navbaradmin.events({
	'click .listmenu': function (e) {
		//console.log(e.target.id);
		estadoMenu.set(e.target.id);
		///////
		if (e.target.id=='activo') {
			$('#'+e.target.id).css({
				'background-color': 'blue',
				'color': 'white'
			});
			$('#inactivo').css({
				'background-color': 'white',
				'color': 'black'
			});
		}
		else{
			$('#activo').css({
				'background-color': 'white',
				'color': 'black'
			});
			$('#'+e.target.id).css({
				'background-color': 'blue',
				'color': 'white'
			});
		}
		//////volverlo reactivo para que cambie al eliminar o restaurar menu

	},
	'click .editarmenu': function () {
		
		var carrera = FlowRouter.getParam('titulo');
		var id = FlowRouter.getQueryParam('id');
		FlowRouter.go('/admin/:titulo/navbar/editarmenu',{titulo:carrera},{id:id,idMenu:this._id});
		
	},
	'click #btnnuevomenu': function () {
		var carrera = FlowRouter.getParam('titulo');
		var idSitio = FlowRouter.getQueryParam('id');
		FlowRouter.go('/admin/:titulo/navbar/nuevo',{titulo:carrera},{id:idSitio}); 
		
	},
	'click .elimenu': function () {
		var eliminar = confirm('esta seguro de inactivar el menu...?');
		if (eliminar) {
			Meteor.call('darEstadoMenu', this._id,'inactivo', function (error, result) {});
			estadoMenu.set('inactivo');
		}
		
	},
	'click .restmenu': function () {
		var restaurar = confirm('esta seguro de Reactivar el menu...?');
		if (restaurar) {
			Meteor.call('darEstadoMenu', this._id,'activo', function (error, result) {});
			estadoMenu.set('activo');
		}
		
	},

	'input #nombre': function (e) {		
		link(e.target.value,'#link');
			
	},
	'input #nombreedit': function (e) {
		link(e.target.value,'#linkedit');		
	},

	///eventos para el submenu
	'click .versubmenu': function () {
		//console.log(this);
		$('#'+this._id).slideToggle('slow');
	},
	'click .editsubmenu': function () {
			$('#subconte div div input#nombreedit').val(this.nombre);
		$('#subconte div div input#linkedit').val(this.link);
		$('#subconte div div input#idsubmenu').val(this._id);

		$('#subconte div div select option[value="'+this.idMenu+'"]').prop('selected', true);
		//console.log(MENU.find().fetch());

		$('#submenuModalEdit').modal('show');
	

	},
	'submit #editsubmenu': function (e) {
		e.preventDefault();
		var idSub = e.target.idsubmenu.value;
		//console.log(idSub);
		var obj = {
			idMenu : e.target.menu.value,
			nombre : e.target.nombre.value,
			link : e.target.link.value,
		};
		//console.log(obj);
		Meteor.call('editSubmenu', idSub,obj, function (error, result) {});
		$('#editsubmenu')[0].reset();		
		$('#submenuModalEdit').modal('hide');
	},
	'click .elisubmenu': function () {
		var idSub = this._id;
		estado = 'Inactivo';
		Meteor.call('darEstadoSubmenu', idSub,estado, function (error, result) {});
	},
	'click .restsubmenu': function () {
		var idSub = this._id;
		estado = 'Activo';
		Meteor.call('darEstadoSubmenu', idSub,estado, function (error, result) {});	
	},
	'click .newsubmenu': function () {
		$('#subcont input#idmenu').val(this._id);
		$('#subcont input#menu').val(this.nombre);

		//console.log($('#subcont input#idmenu').val());
		
		$('#submenuModal').modal('show');
		
	},
	'submit #addsubmenu': function (e) {
		e.preventDefault();
		var obj = {
			idSitio : FlowRouter.getQueryParam('id'),
			idMenu : e.target.idmenu.value,
			nombre : e.target.nombre.value,
			link : e.target.link.value,
			estado : 'Activo'
		}
		console.log(obj);
		Meteor.call('insSubmenu', obj, function (error, result) {
			console.log(result);
		});
		$('#addsubmenu')[0].reset();
		$('#submenuModal').modal('hide');
	},
	///fin events submenu
	'change #color': function () {
		var id = FlowRouter.getQueryParam('id');
		var obj = {
			color : $('#color').val()
		}
		Meteor.call('bannerChange', id,obj, function (error, result) {});
	},
	'change #fuente': function () {
		var id = FlowRouter.getQueryParam('id');
		var obj = {
			fuente : $('#fuente').val()
		}
		Meteor.call('bannerChange', id,obj, function (error, result) {});
	}
});
Template.nuevomenu.events({
	'submit #formmenu': function (e) {
		e.preventDefault();

		var obj = {
			nombre : e.target.nombre.value,
			link : e.target.link.value,
			tipo : e.target.tipo.value,
			idSitio : FlowRouter.getQueryParam('id'),
			estado : 'activo'
		}
		//console.log(obj);
		Meteor.call('insertMenu', obj, function (error, result) {
			if (result) {
				console.log	(result);
			}
		});
		var carrera = FlowRouter.getParam('titulo');
		var idSitio = FlowRouter.getQueryParam('id');
		FlowRouter.go('/admin/:titulo/navbar',{titulo:carrera},{id:idSitio});
	},
	'input #nombre': function (e) {
		link(e.target.value,'#link');
	}
});

Template.editarmenu.helpers({
	menu: function () {
		return MENU.findOne({_id:FlowRouter.getQueryParam('idMenu')});
	},
	menuNormal : function (){
		var menu = MENU.findOne({_id:FlowRouter.getQueryParam('idMenu')});
		if (menu != undefined && menu.tipo=='normal') {
			return	true;
		}
		return false;
		///arreglar con jquery metdo facil;
	}
});

Template.editarmenu.events({
	'submit #formeditmenu': function (e) {
		e.preventDefault();
		var id = FlowRouter.getQueryParam('idMenu');
		var obj = {
			nombre : e.target.nombre.value,
			link : e.target.link.value,
			tipo : e.target.tipo.value,			
		}
		Meteor.call('editMenu', id,obj, function (error, result) {});
		var carrera = FlowRouter.getParam('titulo');
		var idSitio = FlowRouter.getQueryParam('id');
		FlowRouter.go('/admin/:titulo/navbar',{titulo:carrera},{id:idSitio});
		
	},
	'input #nombre': function (e) {
		link(e.target.value,'#link');
		
	}

});