import {Meteor} from "meteor/meteor";

import './user.html';

sitioClient = new ReactiveVar();
posBanner = new ReactiveVar();
var estilo = new ReactiveVar();

Template.user.onCreated(function(){
	this.autorun(()=>{
			sitioClient.set(SITIO.findOne());
			//console.log(sitioClient.get());
		});			
});

Template.user.helpers({
	readySitio : function(){
		//seria genial cargar aqui la variable reactiva sitioClient
        return FlowRouter.subsReady("getSitioClient");
    },
	Sitio: function () {
		
		if (SITIO.find({estado : 'Activo'}).fetch().length>0) {
			
			return	true;
		}
		return	false;
	},
	headerArriba : function(){
		//console.log(sitioClient.get());
		var posicion = '';
		if (sitioClient.get()!=undefined) {
			 posicion = HEADER.findOne({idSitio : sitioClient.get()._id});
		}
		if (posicion != undefined && posicion.posicion == 'up' ) {
			//console.log('up');
			return true
		}
		return false;
	},
	navbarTheme : function(){
		var id = sitioClient.get();
		//console.log(id);
		if (id != undefined && NAVBAR.findOne({idSitio:id._id})!=undefined) {
			estilo.set(NAVBAR.findOne({idSitio:id._id}));
			return {color:estilo.get().color,fuente:estilo.get().fuente};
		}
		
	}
});

Template.header.helpers({
	header: function () {
		return HEADER.find({});
	}
});
Template.banner.helpers({
	banner : function(){
		return BANNER.findOne({});
	},
	tipoDefault : function(){
		var banner = BANNER.findOne({});
		if (banner != undefined && banner.tipo == "carrusel") {
			return	{default : true};
		}
		if (banner != undefined && banner.tipo == "texto e imagen") {
			return	{texto : true};
		}
		//return false;
	}
});
Template.navbar.helpers({
	navbar: function () {
		
		var id = sitioClient.get();
		//console.log(id);
		if (id != undefined && NAVBAR.findOne({idSitio:id._id})!=undefined) {
			var estilo = NAVBAR.findOne({idSitio:id._id});

			//$('#mainNav').css({'background-color': estilo.color});
			//$('#contfooter').css({'background-color': estilo.color});

			//console.log(estilo.fuente);
			//$('#sitiostyle').removeClass();		
			//$('#sitiostyle').css('font-family',estilo.fuente);		
		}
		return true;
	},
	listMenu : function	(){

		//console.log(sitioClient.get());
		return MENU.find({estado : 'activo',idSitio:sitioClient.get()._id});
	},
	navbarTheme : function(){
		var id = sitioClient.get();
		//console.log(id);
		if (id != undefined && NAVBAR.findOne({idSitio:id._id})!=undefined) {
			var estilo = NAVBAR.findOne({idSitio:id._id});
			return {color:estilo.color,fuente:estilo.fuente};
		}
		
	}

});
Template.menu.helpers({
	submenu : function () {
		if (this.tipo=="con submenu") {
			return true;
		}
		return	false;
	},
	listSubmenu : function(){
		//console.log(this);
		return	SUBMENU.find({idMenu : this._id,estado:"Activo"});
	},
	themeColor : function(){
		//console.log(estilo.get());
		if (estilo.get() != undefined) {
			return	estilo.get().color;
		}
		
	}
});
Template.sidebar.helpers({
	listMenus: function () {
		return MENUENLACE.find();
	},
	listEnlaces: function () {
		//console.log(this)
		return ENLACE.find({idMenu:this._id});
	},
	sidebar : function(){
		return SIDEBARMENU.findOne({});
	},
	sidebarDefault : function(){
		var sidebar = SIDEBARMENU.findOne({});
		if (sidebar != undefined && sidebar.tipo == "default") {
			return true;
		}
		return false;
	}
});
Template.footer.onRendered(	function(){
	this.autorun(()=>{
			
    	
		});
});	
Template.footer.helpers({
	footer: function () {
		
		return FOOTER.findOne();
	},
	/*titulo : function(){
		var titulo = HEADER.findOne();
		if (titulo!= undefined ) {
			return titulo.titulo;
		}
		
	},*/
	navbarTheme : function(){
		var id = sitioClient.get();
		//console.log(id);
		if (id != undefined && NAVBAR.findOne({idSitio:id._id})!=undefined) {
			var estilo = NAVBAR.findOne({idSitio:id._id});
			return {color:estilo.color,fuente:estilo.fuente};
		}
		
	},
	footerDefault : function(){
		var footer = FOOTER.findOne({});
		if (footer != undefined && footer.tipo == "default") {
			return true;
		}
		return false;
	}

});