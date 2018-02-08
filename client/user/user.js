import {Meteor} from "meteor/meteor";

import './user.html';
sitioClient = new ReactiveVar();
posBanner = new ReactiveVar();
Template.user.onRendered(function(){
	//console.log(SITIO.findOne());
	var alto = $(window).height();
	console.log(alto);
	//var footerpos = $('#contfooter').offset();
	var footerh = $('#contfooter').height()

	$('#contenedor').height(alto-5);
	$('#contfooter').offset({top:alto-footerh-5});	
})	
Template.user.helpers({
	Sitio: function () {
		
		if (SITIO.find().fetch().length>0) {
			sitioClient.set(SITIO.findOne());
			//console.log(SITIO.findOne());
			return	true;
		}
		return	false;
	},
	bannerArriba : function(){
		//console.log(sitioClient.get());
		var posicion = BANNER.findOne({idSitio : sitioClient.get()._id});
		if (posicion != undefined && posicion.posicion == 'up' ) {
			//console.log('up');
			return true
		}
		return false;
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
		if (NAVBAR.findOne({idSitio:id._id})!=undefined) {
			var estilo = NAVBAR.findOne({idSitio:id._id});
			$('#mainNav').css({
				'background-color': estilo.color,
				'font-family': estilo.fuente
			});		
		}
		return true;
	},
	listMenu : function	(){
		//console.log(sitioClient.get());
		return MENU.find({estado : 'activo',idSitio:sitioClient.get()._id});
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
Template.footer.helpers({
	listFooter: function () {
		return FOOTER.find();
	},
	titulo : function(){
		var titulo = BANNER.findOne();
		if (titulo!= undefined ) {
			return titulo.titulo;
		}
		
	}
});