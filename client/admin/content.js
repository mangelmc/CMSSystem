import './content.html';
import { ReactiveVar } from 'meteor/reactive-var';
var estadoMenu = new ReactiveVar('activo');
var estadoContenido = new ReactiveVar('visible');
var menu = new ReactiveVar();

var globalHelpers = {
	sitio : function(){
		return sitioId.get();
	}
}

Template.contentmenuadmin.helpers(globalHelpers);
Template.contentmenuadmin.helpers({

	listBanner : function(){
		var id = FlowRouter.getQueryParam('id');
		return	CUERPO.find({idSitio:id});	
	
	},
	estado : function(){
		if (estadoMenu.get()=='activo') {
			return {texto:'ACTIVOS'};
		}
		return {texto:'INACTIVOS'};
	},
	listMenu : function(){
		return MENU.find({estado:estadoMenu.get()});
	},
	nombreMenu :function(){
		console.log(this.nombre);
	},
	submenu : function(){
		//console.log(this);
		if (this.tipo=='con submenu') {
			return	true;
		}
		return false;
	},
	menuNormal : function(){
		//console.log(this.tipo);
		if (this.tipo == 'normal' || this.link == '/') {
			return true;
		}
		return false;
	},

	activo : function(){
		//console.log();
		if (this.estado=='activo') {
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
Template.contentmenuadmin.events({
	//agregar evento para agragar submenu desde content
	'click .listmenu': function (e) {
		//console.log(e.target.id);
		estadoMenu.set(e.target.id);
	},
	'click .contenidomenu': function () {
		
		var carrera = FlowRouter.getParam('titulo');
		FlowRouter.go('/admin/:titulo/contenido/:idMenu',{titulo:carrera,idMenu:this._id});
		
	},

	'change #tipofondo': function (e) {
		var tipo = e.target.value;
		if (tipo == 'color') {
			$('#imgfondo').slideUp('slow', function() {
				$('#colorfondo').slideDown('slow');
			});	
		}
		if (tipo == 'imagen') {
			$('#colorfondo').slideUp('slow', function() {
				$('#imgfondo').slideDown('slow');
			});	
		}
	}
});
Template.contentadmin.helpers(globalHelpers);

Template.contentadmin.helpers({
	listContenidos : function(){
		return CONTENIDO.find({idMenu : FlowRouter.getParam('idMenu'),visible : estadoContenido.get()});
	},
	contenido: function () {
		var id = FlowRouter.getParam('idMenu');
		var menu = MENU.findOne({_id : id});
		var submenu = SUBMENU.findOne({_id : id});
		if (submenu != undefined) {

			console.log(submenu);
			return submenu;
		} 
		console.log(menu);
		return	menu;	
	},
	estado : function(){
		if (estadoContenido.get() == 'visible') {
			return 'Visibles';
		}
		return 'Ocultos';
	},
	visible : function(){
		if (this.visible == 'visible') {
			return	true;
		}
		return false;
	},
	nombreMenuContenido : function(){
		var menu = MENU.findOne();
		var submenu = SUBMENU.findOne({});
		if (menu != undefined ) {
			return	menu.nombre;
		}
		if (submenu != undefined) {
			return	submenu.nombre;
		}
		return 'Menu Actual';
	}
});
Template.contentadmin.events({
	'click .editcontenido': function () {
		//console.log(this._id);
		//return;
		
		var carrera = FlowRouter.getParam('titulo');
		FlowRouter.go('/admin/:titulo/editcontenido/:idCont',{titulo:carrera,idCont:this._id});
	},
	'click .listmenu': function (e) {	
			estadoContenido.set(e.target.id);
	},
	'click #nuevocontenido': function () {
		var carrera = FlowRouter.getParam('titulo');
		var menu = FlowRouter.getParam('idMenu');
		FlowRouter.go('/admin/:titulo/newcontenido/:idMenu',{titulo:carrera,idMenu : menu});
	},
	'click .ocultarcont': function () {
		var obj = {
			visible : 'oculto'
		}
		Meteor.call('visibilityContent', this._id,obj, function (error, result) {
			if (result) {
				console.log(result);
			}		
		});
	},
	'click .mostrarcont': function () {
		var obj = {
			visible : 'visible'
		}
		Meteor.call('visibilityContent', this._id,obj, function (error, result) {
			if (result) {
				console.log(result);
			}		
		});
	}
});
Template.newcontentadmin.helpers(globalHelpers);
Template.newcontentadmin.helpers({
	idMenu : function(){
		return FlowRouter.getParam('idMenu');
	}
});
Template.newcontentadmin.events({
	'submit #formnuevocontenido': function (e) {
		e.preventDefault();
		var sitio = FlowRouter.getParam('titulo');
		var idMenu = FlowRouter.getParam('idMenu');
		var obj = {
			idSitio : sitio,
			idMenu : idMenu,
			tipo : e.target.tipo.value,
			titulo : e.target.titulo.value,
			texto : e.target.texto.value,
			comentarios : e.target.comentable.value,
			visible : 'visible',
			idImagen : idImagen.get()
		}
		
		//console.log(idImagen.get());return;
		Meteor.call('insContent', obj, function (error, result) {
			if (result) {
				console.log(result);
			}		
		});
		FlowRouter.go('/admin/:titulo/contenido/:idMenu',{titulo:sitio,idMenu : idMenu});
	}
});
Template.editcontentadmin.onRendered(function(){
	
	this.autorun(function () {
		//if (CONTENIDO.findOne() != undefined) {
			contenido = CONTENIDO.findOne();			
			//console.log(contenido.tipo);
			$('#tipo option[value="'+contenido.tipo+'"]').prop('selected', true);
			$('input[value="'+contenido.visible+'"]').prop('checked', true);
			$('input[value="'+contenido.comentarios+'"]').prop('checked', true);
			
		//}
	});
})
Template.editcontentadmin.helpers(globalHelpers);

Template.editcontentadmin.helpers({
	content: function () {
		return CONTENIDO.findOne();
	},
	
});
Template.editcontentadmin.events({
	'submit #formeditcontenido': function (e) {
		e.preventDefault();
		var sitio = FlowRouter.getParam('titulo');
		var idCont = FlowRouter.getParam('idCont');
		var idMenu = e.target.idmenu.value;
		var obj = {
			
			tipo : e.target.tipo.value,
			titulo : e.target.titulo.value,
			texto : e.target.texto.value,
			comentarios : e.target.comentable.value,
			visible : e.target.visible.value,
		}
		//console.log(obj);
		Meteor.call('editContent',idCont, obj, function (error, result) {
			if (result) {
				console.log(result);
			}		
		});
		FlowRouter.go('/admin/:titulo/contenido/:idMenu',{titulo:sitio,idMenu : idMenu});
		
	}
});


Template.editarcont.onRendered(function(){
	console.log('rendered');
	
		$('#summernote').summernote();
});
Template.editarcont.onDestroyed(function(){
	$('#summernote').summernote('destroy');
})