import {Meteor} from "meteor/meteor";

import './user.html';

sitioClient = new ReactiveVar();
posBanner = new ReactiveVar();

Template.user.onCreated(function(){
	this.autorun(()=>{
			sitioClient.set(SITIO.findOne());
			//console.log(sitioClient.get());

		});
		
			
});
Template.user.onRendered(function(){
		
/// buscar otra maneras de cargar datos trCK autorn stratup
});

Template.user.helpers({
	readySitio : function(){
        return FlowRouter.subsReady("getSitioClient");
    },
	Sitio: function () {
		
		if (SITIO.find({estado : 'Activo'}).fetch().length>0) {
			
			return	true;
		}
		return	false;
	},
	bannerArriba : function(){
		//console.log(sitioClient.get());
		var posicion = '';
		if (sitioClient.get()!=undefined) {
			 posicion = BANNER.findOne({idSitio : sitioClient.get()._id});
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
			var estilo = NAVBAR.findOne({idSitio:id._id});
			return {color:estilo.color,fuente:estilo.fuente};
		}
		
	}
});

Template.banner.helpers({
	banner: function () {
		return BANNER.find({});
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
		return	SUBMENU.find({idMenu : this._id});
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
});
Template.footer.onRendered(function(){
	this.autorun(()=>{
			
    	
		});
});	
Template.footer.helpers({
	listFooter: function () {
		return FOOTER.find();
	},
	titulo : function(){
		var titulo = BANNER.findOne();
		if (titulo!= undefined ) {
			return titulo.titulo;
		}
		
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