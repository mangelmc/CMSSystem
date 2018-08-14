import {Meteor} from "meteor/meteor";

import './site.html';
import badWordsFilter from '../badWordFilter.js';

import '/imports/css3-animate-it/js/css3-animate-it.js';
render = new ReactiveVar(false);
renderfoot = new ReactiveVar(false);
rendersub = new ReactiveVar(false);
sitioClient = new ReactiveVar();

var estilo = new ReactiveVar();

Template.site.onCreated(function(){
	this.autorun(() => {
			sitioClient.set(SITIO.findOne());
			//console.log(sitioClient.get());
		});			
});
Template.site.onRendered(function(){
	//console.log($(document).height());
	
	$.force_appear();
})
Template.site.helpers({
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
		
	},
	cuerpo : function(){
		var cuerpo = CUERPO.findOne();
		//console.log(cuerpo);

		if (cuerpo != undefined) {
			return "background-color : " + cuerpo.fondo + " !important";
		}
	}
});

Template.header.helpers({
	header: function () {
		return HEADER.find({});
	}

});
Template.header.events({
	'click #logout': function () {
		Meteor.logout();
		FlowRouter.go('/');
	}
});
Template.banner.onRendered(function(){

	$.force_appear();
})
Template.banner.helpers({
	banner : function(){
		return BANNER.findOne({});
	},
	bannerReady : function(){
    	
    	return FlowRouter.subsReady("getBannerClient");
    },
	tipoDefault : function(){
		var banner = BANNER.findOne({});
		if (banner != undefined && banner.tipo == "carrusel") {
			
			$(window).scrollTop($(window).scrollTop()+1);
			return	{carrusel : true};
		}
		if (banner != undefined && banner.tipo == "texto e imagen") {
			
			$(window).scrollTop($(window).scrollTop()+1);			
			return	{texto : true};
		}
		$(window).scrollTop($(window).scrollTop()+1);
		//return false;
	},
	listCarrusel : function(){
		return CARROUSEL.find();
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
		return MENU.find({estado : 'activo'});
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
Template.menu.onRendered(function(){
	//hacer reactivo
	Tracker.autorun(() => {
		$(".drop").click().hover(function() {
        
        var id = $(this).attr('id');
        
        
          $(this).addClass('mostaza');
          $('#'+id+1).show('fast');

        //$('.drop').finish();
        
        $('.drop ').clearQueue();
        /* Stuff to do when the mouse enters the element */
      }, function() {
        
        /*var id = $(this).attr('id');
        $('#'+id+1).hide('fast');
        $(this).css('background-color','blue');*/

        $('.drop div').each(function(index, el) {
          if ($(this).css('display')=='block') {
            $(this).hide('fast');
            
          }
          $(this).parent().removeClass('mostaza');
        });
      $('.drop div').finish();
      /* Stuff to do when the mouse leaves the element */
    });
    $(window).scrollTop($(window).scrollTop()+1);
    //console.log($(window).scrollTop());
	});
	
    
})
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
		
	},
	enlace : function (){
		
		if (this.link == "/") {
			return FlowRouter.getParam('titulo');	
		}
		if (this.tipo == undefined) {
			
			return {t : FlowRouter.getParam('titulo'),sub :  this.link};
		}

		return FlowRouter.getParam('titulo') + "/" + this.link;
	}
});
Template.menu.events({
	'click .tosubmenu': function () {
		//console.log('tosub');
		$(window).scrollTop($(window).scrollTop()+10);
		idMenu = this.idMenu;
		$('#'+idMenu+1).hide('fast');
		
	}
});



Template.contenthome.onRendered(function(){
	
	//$.force_appear();
    		
});
Template.contenthome.helpers({
	boletinesOk : function(){
		//???
		var menu = MENU.findOne({nombre:"BOLETINES"});
		var cont = [];
		if (menu != undefined) {
			cont = CONTENIDO.find({idMenu : menu._id}).fetch();
		}
		if (cont.length > 0) {
			return true;
		}
		return false;
	},
	eventosOk : function(){
		//???
		var menu = MENU.findOne({nombre:"MENU"});
		var cont = [];
		if (menu != undefined) {
			cont = CONTENIDO.find({idMenu : menu._id}).fetch();
		}
		if (cont.length > 0) {
			return true;
		}
		return false;
	},
	boletines: function () {
		var menu = MENU.findOne({nombre:"BOLETINES"});
		if (menu != undefined) {
			return CONTENIDO.find({idMenu : menu._id});
		}
	},
	eventos : function(){
		var menu = MENU.findOne({nombre:"EVENTOS"});
		if (menu != undefined) {
			return CONTENIDO.find({idMenu : menu._id});
		}
	},
	sitio : function(){

		return FlowRouter.getParam('titulo');
	}
});
Template.contenthome.events({
	'click #goCont1': function () {
		var sitio = FlowRouter.getParam('titulo');
		$(window).scrollTop(1);
		//dynamic
		FlowRouter.go("/:titulo/boletines",{titulo : sitio});
	},
	'click #goCont2': function () {
		var sitio = FlowRouter.getParam('titulo');
		$(window).scrollTop(1);
		//dynamic
		FlowRouter.go("/:titulo/eventos",{titulo : sitio});
	}
});

Template.contentmenu.onRendered(function(){
	this.autorun(() => {
		if (render.get() == true) {			
    		$.force_appear();
    		//$(window).scrollTop($(window).scrollTop()+1);
			//console.log('rendered verif app force_appear');
		}
		render.set(false);
	});
	Tracker.autorun(() => {
		$.force_appear();
		//console.log('tracked');
	})

});





Template.contentmenu.helpers({
	
	listContentMenu: function () {
		
		return	CONTENIDO.find();
	},
	menu (){
		return MENU.findOne({link : FlowRouter.getParam('menu')});
	}
});
Template.contentmenu.events({
	'click .todetails': function () {
		console.log(this.ruta);
		var sitio = FlowRouter.getParam('titulo');
		var menu = FlowRouter.getParam('menu');
		var ruta= this.ruta;
		FlowRouter.go('menuContent',{titulo:sitio,menu:menu,contenido:ruta});
	}
});

Template.contentsubmenu.onRendered(function(){
	this.autorun(() => {
		if (rendersub.get() == true) {			
    		$.force_appear();
    		//$(window).scrollTop($(window).scrollTop()+1);
			//console.log('rendered verif app force_appear');
		}
		rendersub.set(false);

	});

});
Template.contentsubmenu.helpers({
	listContentSubmenu: function () {
		return	CONTENIDO.find();//submenu
	},
	submenu (){
		$.force_appear();
		return SUBMENU.findOne({link : FlowRouter.getParam('submenu')});
	},
	allRuta : function(){
		return '/' + FlowRouter.getParam('titulo') +
				'/' + FlowRouter.getParam('menu') +
				'/' + FlowRouter.getParam('submenu') +
				'/' + this.ruta;
	}
	
});
Template.contentsubmenu.events({
	
});

Template.contenido.helpers({
	content: function () {
		$.force_appear();
		return CONTENIDO.findOne();
	},
	comentable : function(comentarios){
		
		if (comentarios == 'Si') {
			return	true;
		}
		return false;
	},
	listComents : function(){
		console.log(COMENTARIO.find().fetch());
		return COMENTARIO.find();
	},
	user : function(){
		return Meteor.users.findOne({_id : this.idUsuario});
	},
	fecha : function(){
    	var fecha = this.creado;
        var options ={
            weekday:'long',year:'numeric',month:'long',day:'numeric'
        }
        fecha = fecha.toLocaleDateString('es-ES',options);
        return fecha;
    },

});
Template.contenido.onRendered(function(){
	$.force_appear();
});
Template.contenido.events({
	'submit #comentForm': function (e,t) {
		e.preventDefault();
		var txt = e.target.texto.value;
		var res = badWordsFilter(txt);
		//var regExp = new RegExp(/*badWords.join("|")*/badWords[0],"gi");
		//console.log(regExp);
		//console.log(txt.match(regExp));
		//=
		var estado ='visible';
		if (res.result == false) {
			var conf = confirm(res.msj+'\n Si continua podria ser baneado.. \n ¿Esta seguro de enviar el comentario.?');
			if (conf == false) {
				return false;
			}
			estado = 'oculto';
			Meteor.call('banComentUser', 1, function (error, result) {});
			console.log(conf);
			Meteor.logout();
		}
		
		
		var idCont = CONTENIDO.findOne()._id;

		var obj = {
			idContenido : idCont,
			texto : e.target.texto.value,
			idUsuario : Meteor.userId(),
			estado : estado
		}
		//console.log(obj);
		Meteor.call('insComentario', obj, function (error, result) {
			if (result) {
				console.log(result);
			}
		});
		$('#texto').val('');
	
	}
});
Template.sidebar.onRendered(function(){
	$.force_appear();
})
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
	this.autorun(() => {
		if (renderfoot.get() == true) {			
    		$.force_appear();
    		
			//console.log('rendered verif app force_appear');
		}
		renderfoot.set(false);
	});
	$.force_appear();
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
	},
	listLinks : function () {
		
		return FOOTERLINKS.find();
	},
});