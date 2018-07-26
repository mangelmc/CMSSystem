import './sidebar.html';
import { ReactiveVar } from 'meteor/reactive-var';
import validar from '../validations.js';

var estadoSidebar = new ReactiveVar('Activo');

var nombreSideForm = new ReactiveVar(false);
var nombreEnForm = new ReactiveVar(false);
var urlEnForm = new ReactiveVar(false);
var nombreEnFormE = new ReactiveVar(true);
var urlEnFormE = new ReactiveVar(true);



Template.sidebaradmin.onRendered(function(){
	this.autorun(function(){
		if (SIDEBARMENU.findOne() != undefined) {
			sidebar = SIDEBARMENU.findOne();			
			//console.log(contenido.tipo);
			es.summernote('code', sidebar.html);

			//control imagen
			//if (contenido.tipo == 'Con imagen') {}
			//idImagen.set(contenido.idImagen); podria servir para el preview de contenido
		}
	});
})
Template.sidebaradmin.helpers({
	sidebar: function () {
		return SIDEBARMENU.findOne();
	},
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
	sidebarDefault : function(){
		var sidebar = SIDEBARMENU.findOne({});
		//console.log(tipo);
		if (sidebar != undefined && sidebar.tipo == "default") {
			$('#tiposidebar option[value="'+sidebar.tipo+'"]').prop('selected', true);
			return true;
		}
		$('#tiposidebar option[value="personalizado"]').prop('selected', true);
		return false;
	}	
});

Template.sidebaradmin.events({
	'click #btnnuevomenu': function () {
		var carrera = FlowRouter.getParam('titulo');
		FlowRouter.go('/admin/:titulo/sidebar/nuevomenuenlace',{titulo:carrera},{idmenuenlace:this._id});
		
	},
	'click .editsidebar': function () {
		
		var carrera = FlowRouter.getParam('titulo');
		FlowRouter.go('/admin/:titulo/sidebar/editarmenuenlace',{titulo:carrera},{idmenuenlace:this._id});
		
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
	'change #tiposidebar': function (e) {
		var idSitio = FlowRouter.getParam("titulo");
		var obj = {
			tipo : e.target.value,
		}
		//console.log(obj);
		Meteor.call('sidebarChange', idSitio,obj, function (error, result) {
			sAlert.info('Se modifico ', {effect: 'slide',offset: '130'});
			//console.log(result);
		});
	},
	'submit #formsidebarhtml': function (e) {
		e.preventDefault();
		var obj = {
			html : es.summernote('code'),
		}
		var idSitio = FlowRouter.getParam('titulo');
		Meteor.call('editsidebarHtml', idSitio,obj, function (error, result) {
			if (result) {				
					sAlert.success('Se ha modificado', {effect: 'slide',offset: '130',html:true});
			}

		});
	}
});
Template.nuevomenuenlace.events({
	'input #nombre': function (e) {
		//console.log(e.target.value);	
		var result = validar('carrera',e.target.value,'#alertnombre');
		if (result == false) {
			nombreSideForm.set(false);
		}
		else{
			nombreSideForm.set(true);
		}
	},
	'submit #formmenuenlace': function (e) {
		e.preventDefault();
		if (nombreSideForm.get() == false) {
			alert('Debe solucionar los errores del formulario');
			return;
		}
		var obj = {
			idSitio : FlowRouter.getParam('titulo'),
			nombre : e.target.nombre.value,
		}
		Meteor.call('insMenuEnlace', obj, function (error, result) {
			if (result) {
				var carrera = FlowRouter.getParam('titulo');
				FlowRouter.go('/admin/:titulo/sidebar/editarmenuenlace',{titulo:carrera},{idmenuenlace:result});
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
	'input #nombree': function (e) {
		//console.log(e.target.value);	
		var result = validar('carrera',e.target.value,'#alertnombree');
		if (result == false) {
			nombreEnForm.set(false);
		}
		else{
			nombreEnForm.set(true);
		}
	},
	'input #urle': function (e) {
		//console.log(e.target.value);	
		var result = validar('url',e.target.value,'#alerturle');
		if (result == false) {
			urlEnForm.set(false);
		}
		else{
			urlEnForm.set(true);
		}
	},
	'submit #formenlace': function (e) {
		e.preventDefault();
		if (nombreEnForm.get() == false ||urlEnForm.get() == false) {
			alert('Debe solucionar los errores del formulario');
			return;
		}
		var obj ={
			idSitio : FlowRouter.getParam('titulo'),
			idMenu : e.target.idmenu.value,
			nombre : e.target.nombre.value,
			url : e.target.url.value
		};
		Meteor.call('insEnlace', obj, function (error, result) {
			if (result) {
				//console.log(result);
				sAlert.success('Se ha creado un nuevo enlace', {effect: 'slide',offset: '160',html:true});
		
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
	'input #nombre': function (e) {
		//console.log(e.target.value);	
		var result = validar('carrera',e.target.value,'#alertnombre');
		if (result == false) {
			nombreSideForm.set(false);
		}
		else{
			nombreSideForm.set(true);
		}
	},
	'submit #formeditmenu': function (e) {
		e.preventDefault();
		if (nombreSideForm.get() == false) {
			alert('Debe solucionar los errores del formulario');
			return;
		}
		var nombre = e.target.nombre.value;
		var idMenu = e.target.idmenu.value;
		//
		Meteor.call('editmenuenlace', nombre,idMenu, function (error, result) {
			if (result) {
				sAlert.info('Se guardaron los cambios', {effect: 'slide',offset: '200'});	
			}
			
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
		
		var idMenu = FlowRouter.getQueryParam('idmenuenlace');
		var idEnlace = this._id;
		FlowRouter.go('/admin/:titulo/sidebar/editarenlace',{titulo:titulo},{idmenuenlace:idMenu,idEnlace:idEnlace});

	},
	'click .elienlace': function () {
		var res = confirm('Esta seguro de eliminar el enlace');
		if (res == true) {
			Meteor.call('eliEnlace', this._id, function (error, result) {
				if (result) {
					console.log(result);
					sAlert.success('Se ha eliminado', {effect: 'slide',offset: '130',html:true});
				}
			});		
		}
	},
	

});
Template.editarenlace.helpers({
	enlace: function () {
		return ENLACE.findOne({_id:FlowRouter.getQueryParam('idEnlace')});
	}
});
Template.editarenlace.events({
	'input #nombre': function (e) {
		//console.log(e.target.value);	
		var result = validar('carrera',e.target.value,'#alertnombre');
		if (result == false) {
			nombreEnForm.set(false);
		}
		else{
			nombreEnForm.set(true);
		}
	},
	'input #url': function (e) {
		//console.log(e.target.value);	
		var result = validar('url',e.target.value,'#alerturl');
		if (result == false) {
			urlEnForm.set(false);
		}
		else{
			urlEnForm.set(true);
		}
	},
	'submit #formeditenlace': function (e) {
		e.preventDefault();
		if (nombreEnFormE.get() == false ||urlEnFormE.get() == false) {
			alert('Debe solucionar los errores del formulario');
			return;
		}
		var obj ={
			nombre : e.target.nombre.value,
			url : e.target.url.value
		};
		var idEnlace = e.target.idenlace.value;

		Meteor.call('editEnlace', obj,idEnlace, function (error, result) {
			if (result) {
				sAlert.success('Se guardaron los cambios', {effect: 'slide',offset: '130',html:true});	
			}
		});
		
		var titulo = FlowRouter.getParam('titulo');
		
		var idMenu = FlowRouter.getQueryParam('idmenuenlace');
		
		FlowRouter.go('/admin/:titulo/sidebar/editarmenuenlace',{titulo:titulo},{idmenuenlace:idMenu});

	}
});