import {Meteor} from "meteor/meteor";

import './user.html';

import '/imports/css3-animate-it/js/css3-animate-it.js';


sitioClient = new ReactiveVar();
posBanner = new ReactiveVar();
var estilo = new ReactiveVar();

Template.user.onCreated(function(){
	this.autorun(()=>{
			sitioClient.set(SITIO.findOne());
			//console.log(sitioClient.get());
		});			
});
Template.user.onRendered(function(){
	//console.log($(document).height());
})
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
Template.banner.onRendered(function(){
	//console.log($('#banneruser div').attr('data-ride'));
   	//$('#banneruser').fadeIn('slow');
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
Template.menu.onRendered(function(){
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
		
	}
});
Template.header.onRendered(() => {
	$(window).scrollTop($(window).scrollTop()+1);

	/*var window_left = $(window).scrollLeft();
    var window_top = $(window).scrollTop();
    var offset = $('#t-eventos').offset();
    var left = offset.left;
    var top = offset.top;
    console.log(top);
    console.log(left);
    console.log(window_left);
    console.log(window_top);*/
})
/*
Template.content.onRendered(function(){

	

	if ($(window).innerWidth() > 768) {
		//console.log($(window).innerWidth());
		$(window).scroll(function() {
			var scrollWindow = $(window).scrollTop();
			var posicionbol = 150, posicioneve = 350;//

			//console.log($('#t-boletines').offset().top);

			if ( scrollWindow > posicionbol && $("#boletines").css('display')=='none') {
				//console.log($('#boletines').scrollTop());
				$("#boletines").slideDown().addClass('d-flex');
			}
			if( scrollWindow < posicionbol && $("#boletines").css('display')=='flex'){
				//console.log($('#boletines').scrollTop());
				$("#boletines").slideUp().removeClass('d-flex');
			}
			
			//console.log($('#t-eventos').offset().top);

			if ( scrollWindow > posicioneve && $("#eventos").css('display')=='none') {
				//console.log($('#eventos').scrollTop());
				$("#eventos").slideDown().addClass('d-flex');
			}
			if( scrollWindow < posicioneve && $("#eventos").css('display')=='flex'){
				//console.log($('#eventos').scrollTop());
				$("#eventos").slideUp().removeClass('d-flex');
			}
		});
	}
});
Template.sidebar.onRendered(function(){
	//arregglar con removeClass d-flex
	//console.log($(window).innerHeight()*0.05);
	//console.log($(window).scrollTop());

	$('#t-boletines').click(function(event) {
		
		//console.log('side');
		$("#boletines").slideToggle();
	});
	$('#t-eventos').click(function(event) {
		
		//console.log('side');
		$("#eventos").slideToggle();
	});
	$('#t-sidebar').click(function(event) {
	
		//console.log('side');
		$("#sidebar").slideToggle();
	});
	if ($(window).innerWidth() > 768) {
		$(window).scroll(function() {

		var scrollWindow = $(window).scrollTop();
		var posicionside = 350;//

		//console.log($('#t-sidebar').offset().top);

		if ( scrollWindow > posicionside && $("#sidebar").css('display') == 'none') {
			//console.log($('#sidebar').scrollTop());
			$("#sidebar").slideDown();
		}
		if( scrollWindow < posicionside && $("#sidebar").css('display') == 'block'){
			//console.log($('#sidebar').scrollTop());
			$("#sidebar").slideUp();
		}

		});	
	}

})*/
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