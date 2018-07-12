import './navbar.html';
import { ReactiveVar } from 'meteor/reactive-var';
import validar from '../validations.js'

var nombreMenuForm = new ReactiveVar(false);
var linkMenuForm = new ReactiveVar(true);
var nombreEMenuForm = new ReactiveVar(true);
var linkEMenuForm = new ReactiveVar(true);

var submenuForm = new ReactiveVar(false);
var submenuEditForm = new ReactiveVar(true);

Template.navbaradmin.events({
	
});

	
var estadoMenu = new ReactiveVar('activo');
Template.navbaradmin.onRendered(function() {
});
Template.navbaradmin.helpers({
	color : function(){

	},
	listMenu : function(){
		return MENU.find({estado:estadoMenu.get()});
	},
	listMenuEdit : function(){
		return MENU.find({tipo : 'con submenu'});
	},
	
	estiloNavbar : function(){
		var id = FlowRouter.getParam('titulo');
		if (NAVBAR.findOne({idSitio:id})!=undefined) {
			var estilo = NAVBAR.findOne({idSitio:id});
			$('#bannerestilo').removeClass();
			$('#bannerestilo').css({
				'font-family': estilo.fuente
			});
			$('#bannerestilo').addClass(estilo.color + ' m-2');

			$('#color option[value="'+estilo.color+'"]').prop('selected', true);
			$('#fuente option[value="'+estilo.fuente+'"]').prop('selected', true);


			//alert('load');
		}
		return true;			
		
	},
	noInicio : function(){
		if (this.nombre == "INICIO" || this.nombre == "BOLETINES" ||this.nombre == "EVENTOS") {
			//console.log(this.nombre);
			return false;
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
	},
	'click .editarmenu': function () {

		
		var carrera = FlowRouter.getParam('titulo');
		
		FlowRouter.go('/admin/:titulo/navbar/editarmenu',{titulo:carrera},{idMenu:this._id});
		
	},
	'click #btnnuevomenu': function () {
		var idSitio = FlowRouter.getParam('titulo');
		
		FlowRouter.go('/admin/:titulo/navbar/nuevo',{titulo:idSitio},1); 
		
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
		var result = validar('carrera',e.target.value,'#alertnombre');
		if (result == false) {
			submenuForm.set(false);
			return;
		}
		else{
			submenuForm.set(true);
		}
			
	},
	'input #nombreedit': function (e) {
		var result = validar('carrera',e.target.value,'#alertnombreedit');
		if (result == false) {
			submenuEditForm.set(false);
			return;
		}
		else{
			submenuEditForm.set(true);
		}
		
		link(e.target.value,'#linkedit');		
	},

	///eventos para el submenu
	'click .versubmenu': function () {
		//console.log(this);
		$('#'+this._id).slideToggle('slow');
	},
	'submit #addsubmenu': function (e) {
		e.preventDefault();
		if (submenuForm.get() == false ) {
			alert('Debe solucionar los errores del formulario');
			return;
		}
		var idMenu = e.target.idmenu.value;
		var link = e.target.link.value;
		var idSitio = FlowRouter.getParam("titulo");
		var submenu = SUBMENU.findOne({link : link,idMenu : idMenu});
		//verificar para varios sitios but segun la publicaion solo hay uno :(
		if (submenu != undefined) {
			alert('El link ' + link + ' Ya existe ingrese otro nombre');
			return;
		}
		//console.log(submenu);return;
		var obj = {
			idSitio : idSitio,
			idMenu : idMenu,
			nombre : e.target.nombre.value,
			link : link,
			estado : 'Activo'
		}
		//console.log(obj);
		Meteor.call('insSubmenu', obj, function (error, result) {
			if (result != 'error') {
				sAlert.info("Submenu Agregado", {effect: 'slide',offset: '130'});
			}
		});
		$('#addsubmenu')[0].reset();
		$('#submenuModal').modal('hide');
		
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
		if (submenuEditForm.get() == false ) {
			alert('Debe solucionar los errores del formulario');
			return;
		}
		var idSub = e.target.idsubmenu.value;
		var link = e.target.link.value;
		var idMenu = e.target.menu.value;
		var submenu = SUBMENU.findOne({_id : {$ne : idSub},link : link,idMenu : idMenu });
		if (submenu != undefined) {
			alert('El link " ' + link +' " ya existe elija otro nombre');
			return;
		}
		//console.log(submenu);return;

		var obj = {
			idMenu : idMenu,
			nombre : e.target.nombre.value,
			link : link,
		};
		//console.log(obj);
		Meteor.call('editSubmenu', idSub,obj, function (error, result) {
			if (result) {
				sAlert.info('Se guardaron los cambios', {effect: 'slide',offset: '130'});
			}
		});
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
	///fin events submenu
	'change #color': function () {
		var id = FlowRouter.getParam("titulo");
		var obj = {
			color : $('#color').val()
		}
		Meteor.call('navbarChange', id,obj, function (error, result) {
			sAlert.info(result, {effect: 'slide',offset: '130'});
		});
	},
	'change #fuente': function () {
		var id = FlowRouter.getParam("titulo");
		var obj = {
			fuente : $('#fuente').val()
		}
		Meteor.call('navbarChange', id,obj, function (error, result) {
			sAlert.info(result, {effect: 'slide',offset: '130'});
		});
	}
});
Template.nuevomenu.events({
	'input #nombre': function (e) {
		//console.log(e.target.value);
		var nombre = e.target.value.toUpperCase();	
		var result = validar('carrera',nombre,'#alertnombre');
		if (result == false) {
			nombreMenuForm.set(false);
			return;
		}
		else{
			nombreMenuForm.set(true);
		}
		link(e.target.value,'#link');
		e.target.value = nombre;
		
	},
	'input #link': function (e) {
		//console.log(e.target.value);	
		var result = validar('link',e.target.value,'#alertlink');
		if (result == false) {
			linkMenuForm.set(false);
		}
		else{
			linkMenuForm.set(true);
		}
	},
	'submit #formmenu': function (e) {
		e.preventDefault();
		if (linkMenuForm.get() == false || nombreMenuForm.get() == false) {
			alert('Debe solucionar los errores del formulario');
			return;
		}
		var link = e.target.link.value;
		var menu = MENU.findOne({link : link});

		if (menu != undefined || link == 'inicio') {
			alert('el link " ' + link +' " ; Ya existe cambie el nombre de menu');
			return;
		}

		//console.log('oops');return
		var obj = {
			nombre : e.target.nombre.value,
			link : link,
			tipo : e.target.tipo.value,
			idSitio : FlowRouter.getParam("titulo"),
			estado : 'activo',
			contenido : 'No'
		}
		//console.log(obj);
		Meteor.call('insertMenu', obj, function (error, result) {
			if (result) {
				sAlert.info(result, {effect: 'slide',offset: '130'});
			}
		});
		var carrera = FlowRouter.getParam('titulo');
		var idSitio = FlowRouter.getParam("titulo");
		FlowRouter.go('/admin/:titulo/navbar',{titulo:carrera},{id:idSitio});
	},
	
});
Template.editarmenu.onRendered(function(){
	//control de ruta para edicion de menu 
	var menu = MENU.findOne({_id : FlowRouter.getQueryParam('idMenu')});
	if (menu == undefined) {
		alert('Error');
		FlowRouter.go('/admin');
	}
})
Template.editarmenu.helpers({
	menu: function () {
		
		return MENU.findOne({_id:FlowRouter.getQueryParam('idMenu')});
	},
	menuNormal : function (){
		var menu = MENU.findOne({_id : FlowRouter.getQueryParam('idMenu')});
		if (menu != undefined && menu.tipo=='normal') {
			return	true;
		}
		return false;
		///arreglar con jquery metdo facil;
	},
	hasContenido : function(){
		var menu = MENU.findOne({_id:FlowRouter.getQueryParam('idMenu')});
		if (menu != undefined && menu.contenido == 'Si') {
			return true;
		}
		return false
	} 
});

Template.editarmenu.events({
	
	'input #nombre': function (e) {
		//console.log(e.target.value);
		var nombre = e.target.value.toUpperCase();
		var result = validar('carrera',nombre,'#alertnombre');
		e.target.value = nombre;
		if (result == false) {
			nombreEMenuForm.set(false);
			return;
		}
		else{
			nombreEMenuForm.set(true);
		}
		
		link(e.target.value,'#link');
	},
	'input #link': function (e) {
		//console.log(e.target.value);	
		var result = validar('link',e.target.value,'#alertlink');
		if (result == false) {
			linkEMenuForm.set(false);
		}
		else{
			linkEMenuForm.set(true);
		}
	},
	'submit #formeditmenu': function (e) {
		e.preventDefault();
		var id = FlowRouter.getQueryParam('idMenu');
		var link = e.target.link.value;
		var menu = MENU.findOne({_id : {$ne : id},link : link});
		if (menu != undefined || link =='inicio') {
			alert('el link ' + link + ' , Ya existe pruebe otro nombre');

			return;
		}
		//console.log(menu);return;
		var obj = {
			nombre : e.target.nombre.value,
			link : link,
			tipo : e.target.tipo.value,			
		}
		Meteor.call('editMenu', id,obj, function (error, result) {
			sAlert.info(result, {effect: 'slide',offset: '130'});
		});
		var idSitio = FlowRouter.getParam('titulo');
		
		FlowRouter.go('/admin/:titulo/navbar',{titulo:idSitio},1);
		
	},
	
 
 });



