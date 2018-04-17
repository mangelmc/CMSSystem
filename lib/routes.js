function checkSitio(idSitio){
	Meteor.call('checkSiteRoute', idSitio, function (error, result) {
			if (result.check == false) {
				FlowRouter.go('/'+result.rol);				
			}
		});
}
function checkRolUser(){
	Meteor.call('redirectUser', 1, function (error, result) {		
		if (result.res == true) {
			FlowRouter.go('/'+result.rol);
		}
	});
}
function checkRolRoot(){
	Meteor.call('checkRolRoot', 1, function (error, result) {		
		if (result.res == false) {
			FlowRouter.go('/'+result.route);
		}
	});
}
function trackUser(){
	var ipPublic = '';	
	$.getJSON("https://api.ipify.org?format=jsonp&callback=?",function(json){
		console.log(json.ip);
		ipPublic = json.ip;	
	});
	console.log(ipPublic);
	var version = navigator.appVersion;

	var obj = {
		version : version,
	}
	Meteor.call('trackUser', 1, function (error, result) {
		//console.log(result);
	});
}
FlowRouter.route("/",{
	
	action : function(params,queryParams) {

	checkRolUser();	

	BlazeLayout.render("raiz");
	}
});

//rutas del usuario root

FlowRouter.route("/root",{
	subscriptions : function(params,queryParams){
		this.register("getSitios",Meteor.subscribe('getSitios'));
		this.register("getUsers",Meteor.subscribe('getUsers'));
	},

	action : function(params,queryParams) {
		checkRolRoot();	
		BlazeLayout.render("root",{contentroot:'sitioslist'});
	}
});
FlowRouter.route("/root/sitios",{
	subscriptions : function(params,queryParams){
		this.register("getSitios",Meteor.subscribe('getSitios'));
		this.register("getUsers",Meteor.subscribe('getUsers'));
	},
	
	action : function(params,queryParams) {
		checkRolRoot();	
		BlazeLayout.render("root",{contentroot:'sitios'});
	}
});
FlowRouter.route("/root/usuarios",{
	subscriptions : function(params,queryParams){
		this.register("getUsers",Meteor.subscribe('getUsers'));
		//this.register("getInteg",Meteor.subscribe('getInteg'));
	},
	
	action : function(params,queryParams) {
		checkRolRoot();	
		BlazeLayout.render("root",{contentroot:'usuarios'});
	}
});
FlowRouter.route("/root/usuarios/nuevo",{
	subscriptions : function(params,queryParams){
		//this.register("getSitios",Meteor.subscribe('getSitios'));
		//this.register("getInteg",Meteor.subscribe('getInteg'));
	},
	
	action : function(params,queryParams) {
		checkRolRoot();	
		BlazeLayout.render("root",{contentroot:'nuevousuario'});
	}
});
FlowRouter.route("/root/reportes",{
	subscriptions : function(params,queryParams){
		//this.register("getSitios",Meteor.subscribe('getSitios'));
		//this.register("getInteg",Meteor.subscribe('getInteg'));
	},	
	action : function(params,queryParams) {
		
		checkRolRoot();	

		BlazeLayout.render("root",{contentroot:'reportes'});
		trackUser();
	}
});
FlowRouter.route("/admin",{

	subscriptions : function(params,queryParams){
	

		this.register("getSitiosAdmin",Meteor.subscribe('getSitiosAdmin',Meteor.userId()));
		
		//console.log(params.user);// tomar en cuenta nombres de sitios reservados root admin u otro
	},
	action : function(params,queryParams) {
		trackUser();
		checkRolUser();
		BlazeLayout.render("adminMain");
	}
});
FlowRouter.route("/:titulo",{
	action : function(params,queryParams) {
		BlazeLayout.render("user",{header:"header",navbar:"navbar",banner:"banner",content:"content",footer:"footer",});
	},
	subscriptions : function(params,queryParams){
		this.register("getSitioClient",Meteor.subscribe('getSitioClient',params.titulo));
		this.register("getHeaderClient",Meteor.subscribe('getHeaderClient',params.titulo));
		this.register("getBannerClient",Meteor.subscribe('getBannerClient',params.titulo));
		this.register("getNavbarClient",Meteor.subscribe('getNavbarClient',params.titulo));
		this.register("getSubmenuClient",Meteor.subscribe('getSubmenuClient',params.titulo));
		this.register("getMenuClient",Meteor.subscribe('getMenuClient',params.titulo));
		this.register("getSidebarMenuClient",Meteor.subscribe('getSidebarMenuClient',params.titulo));
		this.register("getSidebarClient",Meteor.subscribe('getSidebarClient',params.titulo));
		this.register("getMenuenlaceClient",Meteor.subscribe('getMenuenlaceClient',params.titulo));

		this.register("getFooterClient",Meteor.subscribe('getFooterClient',params.titulo));
		
	},

});
//del usuario admin

FlowRouter.route("/admin/:titulo",{

	subscriptions : function(params,queryParams){
		//this.register("getSitios",Meteor.subscribe('getSitios'));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));

	},
	action : function(params,queryParams) {
		
		checkSitio(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'welcomeAdmin'});
	}
});

FlowRouter.route("/admin/:titulo/header",{
	subscriptions : function(params,queryParams){
		this.register("getHeader",Meteor.subscribe('getHeader',params.titulo));
		
		//this.register("getCarrusel",Meteor.subscribe('getCarrusel',params.titulo));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
		

	},
	action : function(params,queryParams) {
		checkSitio(params.titulo);	
		BlazeLayout.render("admin",{templateadmin:'headeradmin'});
	}
});
FlowRouter.route("/admin/:titulo/banner",{
	subscriptions : function(params,queryParams){
		
		this.register("getBanner",Meteor.subscribe('getBanner',params.titulo));
		this.register("getCarrusel",Meteor.subscribe('getCarrusel',params.titulo));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
		

	},
	action : function(params,queryParams) {
		checkSitio(params.titulo);	
		BlazeLayout.render("admin",{templateadmin:'banneradmin'});
	}
});
FlowRouter.route("/admin/:titulo/banner/editcarrusel/:id",{
	subscriptions : function(params,queryParams){	
		
		this.register("getCarrusel",Meteor.subscribe('getCarrusel',params.titulo));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
	},
	action : function(params,queryParams) {
		checkSitio(params.titulo);	
		BlazeLayout.render("admin",{templateadmin:'editcarrusel'});
	}
});
FlowRouter.route("/admin/:titulo/navbar",{
	subscriptions : function(params,queryParams){
		this.register("getMenu",Meteor.subscribe('getMenu',params.titulo));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
		this.register("getNavbar",Meteor.subscribe('getNavbar',params.titulo));
		this.register("getSubmenu",Meteor.subscribe('getSubmenu',params.titulo));
		
		//console.log(params);
	},
	action : function(params,queryParams) {
		//console.log(myTemplates.get());
		//myTemplates.set("editarmenuenlace");
		checkSitio(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'navbaradmin'})
	}
	
});
FlowRouter.route("/admin/:titulo/navbar/nuevo",{
	subscriptions : function(params,queryParams){
		//this.register("getSitios",Meteor.subscribe('getSitios'));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
		//console.log(params);
	},
	action : function(params,queryParams) {
		//console.log(myTemplates.get());
		//myTemplates.set("editarmenuenlace");
		checkSitio(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'nuevomenu'})
	}
	
});
/*FlowRouter.route("/admin/:titulo/navbar/editar",{
	subscriptions : function(params,queryParams){
		//this.register("getSitios",Meteor.subscribe('getSitios'));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
		//console.log(params);
	},
	action : function(params,queryParams) {
		//console.log(myTemplates.get());
		//myTemplates.set("editarmenuenlace");
		BlazeLayout.render("admin",{templateadmin:'editarmenu'});
	}
});*/
FlowRouter.route("/admin/:titulo/navbar/editarmenu",{
	subscriptions : function(params,queryParams){
		this.register("getMenu",Meteor.subscribe('getMenu',params.titulo));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
		//console.log(params);
	},
	action : function(params,queryParams) {
		//console.log(myTemplates.get());
		//myTemplates.set("editarmenuenlace");
		checkSitio(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'editarmenu'});
	}
});
FlowRouter.route("/admin/:titulo/contenido",{
	subscriptions : function(params,queryParams){
		//this.register("getSitios",Meteor.subscribe('getSitios'));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
	},
	action : function(params,queryParams) {
		checkSitio(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'contentadmin'});
	}
});

FlowRouter.route("/admin/:titulo/contenido/nuevo",{
	subscriptions : function(params,queryParams){
		//this.register("getSitios",Meteor.subscribe('getSitios'));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
	},
	action : function(params,queryParams) {
		checkSitio(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'nuevocont'});
	}
});

FlowRouter.route("/admin/:titulo/contenido/editar",{
	subscriptions : function(params,queryParams){
		//this.register("getSitios",Meteor.subscribe('getSitios'));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
	},
	action : function(params,queryParams) {

		BlazeLayout.render("admin",{templateadmin:'editarcont'});
	}
});
FlowRouter.route("/admin/:titulo/sidebar",{
	subscriptions : function(params,queryParams){
		this.register("getMenuEnlace",Meteor.subscribe('getMenuEnlace',params.titulo));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
		this.register("getSidebar",Meteor.subscribe('getSidebar',params.titulo));
		
		
	},
	action : function(params,queryParams) {
		checkSitio(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'sidebaradmin'});
	}
});
FlowRouter.route("/admin/:titulo/sidebar/nuevomenuenlace",{
	subscriptions : function(params,queryParams){
		//this.register("getSitios",Meteor.subscribe('getSitios'));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
	},
	action : function(params,queryParams) {
		checkSitio(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'nuevomenuenlace'});
	}
});
FlowRouter.route("/admin/:titulo/sidebar/editarmenuenlace",{
	subscriptions : function(params,queryParams){
		this.register("getMenuEnlace",Meteor.subscribe('getMenuEnlace',params.titulo));
		this.register("getEnlaces",Meteor.subscribe('getEnlaces',queryParams.idmenuenlace));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
		//console.log(queryParams);
	},
	action : function(params,queryParams) {
		checkSitio(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'editarmenuenlace'});
	}
});

FlowRouter.route("/admin/:titulo/sidebar/editarenlace",{
	subscriptions : function(params,queryParams){
		//this.register("getMenuEnlace",Meteor.subscribe('getMenuEnlace',queryParams.id));
		this.register("getEnlaces",Meteor.subscribe('getEnlaces',queryParams.idmenuenlace));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
		//console.log(queryParams);
	},
	action : function(params,queryParams) {
		checkSitio(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'editarenlace'});
	}
});

FlowRouter.route("/admin/:titulo/footer",{
	subscriptions : function(params,queryParams){
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
		this.register("getFooter",Meteor.subscribe('getFooter',params.titulo));
		

	},
	action : function(params,queryParams) {
		checkSitio(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'footeradmin'});
	}

});