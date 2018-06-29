import './content.html';
import { ReactiveVar } from 'meteor/reactive-var';
import validar from '../validations.js';
import '../summernote/summernote-bs4.js';
import '../summernote/summernote-bs4.css';
//import '/imports/lib/summernote/font/summernote.eot';

var estadoMenu = new ReactiveVar('activo');
var estadoContenido = new ReactiveVar('visible');
var menu = new ReactiveVar();

var formContent = new ReactiveVar(false);
var formContentEdit = new ReactiveVar(true);

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
Template.contentadmin.onCreated(function(){
	this.linkMenu = new ReactiveVar('');
})
Template.contentadmin.helpers(globalHelpers);

Template.contentadmin.helpers({
	inicio : function(){
		if (Template.instance().linkMenu.get() == 'INICIO' ) {
			//console.log(Template.instance().linkMenu.get());
			return true;
		}
		return	false;
	},
	listContenidos : function(){
		return CONTENIDO.find({idMenu : FlowRouter.getParam('idMenu'),visible : estadoContenido.get()});
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
			Template.instance().linkMenu.set(menu.nombre);
			return	menu.nombre;
		}
		if (submenu != undefined) {	
			Template.instance().linkMenu.set('');		
			return	submenu.nombre;
		}
		return 'Menu Actual';
	},
	descripcionCut (){
		if (this.descripcion.length > 45 ) {
			return this.descripcion.substr(0,45) + '...';
		}
		return this.descripcion;
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
Template.newcontentadmin.onRendered(function(){

	//console.log('rendered');
	/*var HelloButton = function (context) {
	  var ui = $.summernote.ui;

	  // create button
	  var button = ui.button({
	    contents: '<i class="fa fa-child"/> Hello',
	    tooltip: 'hello',
	    click: function () {
	      // invoke insertText method with 'hello' on editor module.
	      context.invoke('editor.insertText', 'hello');
	    }
	  });

	  return button.render();   // return button as jquery object
	}
	var MyButton = function (context) {
	    var ui = $.summernote.ui;
	    var button = ui.button({
	        contents: 'MyButton',

	        click: function () {
	            var node = document.createElement('span');
	            node.innerHTML = '{{>myTemplate}}'
	            context.invoke('editor.insertNode', node);
	            },
	        });
	    return button.render();
	}*/
	
	  

	es = $('#summernote');

	es.summernote({

	  lang : 'es-ES',
	  //height : 200,
	  toolbar: [
	    ['textstyle', ['style']],
	    //['mybutton', ['hello','buton']],  
	    ['style', ['bold', 'italic', 'underline', 'clear']],
	    ['fontstyle', ['fontname','fontsize','color']],		
	    //['font', ['strikethrough', 'superscript', 'subscript']],
	    ['para', ['ul', 'ol', 'paragraph']],
	    ['height', ['height']],
	    [ 'insert', [ 'link','picture','video','table','hr'] ],
	    ['misc', ['codeview', 'undo', 'redo','help']],
	  ],
	  /*
	  buttons: {
	    hello: HelloButton,
	    buton : MyButton
	  }*/
	});
	$('div.note-group-select-from-files').remove();
	$('.note-editable').css('background-color', 'skyblue');
	//console.log($('#summernote').code())
	

});

Template.newcontentadmin.helpers(globalHelpers);
Template.newcontentadmin.helpers({
	idMenu : function(){
		return FlowRouter.getParam('idMenu');
	}
});
Template.newcontentadmin.events({
	/*'click .check': function (event,instance) {

		const $check = instance.$('.check#'+ this._id + 'c');
  		var ruta = $check.children('img').attr('src');
		console.log(ruta);
		//es.summernote('focus');
		//es.summernote('editor.insertImage', 'Hello');
	
		
	},*/
	
	'input #titulo': function (e) {
		var ruta = e.target.value.trim().split(" ").join("-").toLowerCase();
		var result = validar('dominio',ruta,'#alerttitulo');
		
		//console.log(result);
		if (result==false) {
			formContent.set(false);
			//sAlert.success('Your message', {effect: 'slide'});	
			return;
		}else {
			formContent.set(true);
		}

		$('#ruta').val(ruta);
		
		
	},
	'submit #formnuevocontenido': function (e) {
		
		e.preventDefault();

		if (formContent.get() == false) {
			alert("Debe arreglar los errore en los campos");
			return;
		}
		var html = es.summernote('code');
		var ruta = e.target.ruta.value;
		var sitio = FlowRouter.getParam('titulo');
		var idMenu = FlowRouter.getParam('idMenu');
		var obj = {
			idSitio : sitio,
			idMenu : idMenu,
			titulo : e.target.titulo.value,
			ruta : e.target.ruta.value,
			descripcion : e.target.descripcion.value,
			contenidoHtml : html,
			comentarios : e.target.comentable.value,
			visible : 'visible',
			//idImagen : idImagen.get()
		}
		console.log(obj);
		//console.log(idImagen.get());return;
		Meteor.call('insContent', obj, function (error, result) {
			if (result) {
				console.log(result);
			}		
		});
		FlowRouter.go('/admin/:titulo/contenido/:idMenu',{titulo:sitio,idMenu : idMenu});
	}
});
Template.newcontentadmin.onDestroyed(function(){
	es.summernote('destroy');
});
Template.editcontentadmin.onCreated(function(){
	this.idMenuEdit = new ReactiveVar('');
})
Template.editcontentadmin.onRendered(function(){
	
	
	es = $('#summernote');

	es.summernote({

	  lang : 'es-ES',
	  //height : 200,
	  toolbar: [
	    ['textstyle', ['style']],
	    //['mybutton', ['hello','buton']],  
	    ['style', ['bold', 'italic', 'underline', 'clear']],
	    ['fontstyle', ['fontname','fontsize','color']],		
	    //['font', ['strikethrough', 'superscript', 'subscript']],
	    ['para', ['ul', 'ol', 'paragraph']],
	    ['height', ['height']],
	    [ 'insert', [ 'link','picture','video','table','hr'] ],
	    ['misc', ['codeview', 'undo', 'redo','help']],
	  ],
	  /*
	  buttons: {
	    hello: HelloButton,
	    buton : MyButton
	  }*/
	});
	$('div.note-group-select-from-files').remove();
	$('.note-editable').css('background-color', 'skyblue');
	//console.log($('#summernote').code())
	
	this.autorun(function(){
		if (CONTENIDO.findOne() != undefined) {
			contenido = CONTENIDO.findOne();			
			//console.log(contenido.tipo);

			Template.instance().idMenuEdit.set(contenido.idMenu);
			$('input[value="'+contenido.comentarios+'"]').prop('checked', true);
			es.summernote('code', contenido.contenidoHtml);

			//control imagen
			//if (contenido.tipo == 'Con imagen') {}
			//idImagen.set(contenido.idImagen); podria servir para el preview de contenido
		}
	});
	

})
Template.editcontentadmin.helpers(globalHelpers);

Template.editcontentadmin.helpers({
	content: function () {
		return CONTENIDO.findOne();
	},
	idMenu : function(){
		return Template.instance().idMenuEdit.get();
	}
});

Template.editcontentadmin.events({
	'input #titulo': function (e) {
		var ruta = e.target.value.trim().split(" ").join("-").toLowerCase();
		var result = validar('dominio',ruta,'#alerttitulo');
		
		//console.log(result);
		if (result==false) {
			formContentEdit.set(false);
			//sAlert.success('Your message', {effect: 'slide'});	
			return;
		}else {
			formContentEdit.set(true);
		}

		$('#ruta').val(ruta);
		
		
	},
	'submit #formeditcontenido': function (e) {
		e.preventDefault();
		var sitio = FlowRouter.getParam('titulo');
		var idCont = FlowRouter.getParam('idCont');
		var idMenu = e.target.idmenu.value;
		if (formContentEdit.get() == false) {
			alert("Debe arreglar los errore en los campos");
			return;
		}
		var obj = {
			titulo : e.target.titulo.value,
			descripcion : e.target.descripcion.value,
			ruta : e.target.ruta.value,
			contenidoHtml : es.summernote('code'),
			comentarios : e.target.comentable.value,
			
			//idImagen : idImagen.get()	ver para preview
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
Template.newcontentadmin.onDestroyed(function(){
	es.summernote('destroy');
});

