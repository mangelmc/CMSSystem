function checkOwn(idSitio){
	Meteor.call('checkOwn', idSitio, function (error, result) {
			if (result.check == false) {
				FlowRouter.go('/'+result.rol);				
			}
		});
}

FlowRouter.route("/",{
	
	action : function(params,queryParams) {
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
		
		BlazeLayout.render("root",{contentroot:'sitioslist'});
	}
});
FlowRouter.route("/root/sitios",{
	subscriptions : function(params,queryParams){
		this.register("getSitios",Meteor.subscribe('getSitios'));
		this.register("getUsers",Meteor.subscribe('getUsers'));
	},
	
	action : function(params,queryParams) {
		BlazeLayout.render("root",{contentroot:'sitios'});
	}
});
FlowRouter.route("/root/usuarios",{
	subscriptions : function(params,queryParams){
		this.register("getUsers",Meteor.subscribe('getUsers'));
		//this.register("getInteg",Meteor.subscribe('getInteg'));
	},
	
	action : function(params,queryParams) {
		BlazeLayout.render("root",{contentroot:'usuarios'});
	}
});
FlowRouter.route("/root/usuarios/nuevo",{
	subscriptions : function(params,queryParams){
		//this.register("getSitios",Meteor.subscribe('getSitios'));
		//this.register("getInteg",Meteor.subscribe('getInteg'));
	},
	
	action : function(params,queryParams) {
		BlazeLayout.render("root",{contentroot:'nuevousuario'});
	}
});
FlowRouter.route("/root/reportes",{
	subscriptions : function(params,queryParams){
		//this.register("getSitios",Meteor.subscribe('getSitios'));
		//this.register("getInteg",Meteor.subscribe('getInteg'));
	},	
	action : function(params,queryParams) {
		BlazeLayout.render("root",{contentroot:'reportes'});
	}
});
FlowRouter.route("/admin",{
	subscriptions : function(params,queryParams){
	

		this.register("getSitiosAdmin",Meteor.subscribe('getSitiosAdmin',Meteor.userId()));
		
		//console.log(params.user);// tomar en cuenta nombres de sitios reservados root admin u otro
	},
	action : function(params,queryParams) {
		BlazeLayout.render("adminMain");
	}
});
FlowRouter.route("/:titulo",{
	action : function(params,queryParams) {
		BlazeLayout.render("user",{banner:"banner",navbar:"navbar",content:"content",footer:"footer",});
	},
	subscriptions : function(params,queryParams){
		this.register("getSitioClient",Meteor.subscribe('getSitioClient',params.titulo));
		this.register("getBannerClient",Meteor.subscribe('getBannerClient',params.titulo));
		this.register("getNavbarClient",Meteor.subscribe('getNavbarClient',params.titulo));
		this.register("getSubmenuClient",Meteor.subscribe('getSubmenuClient',params.titulo));
		this.register("getMenuClient",Meteor.subscribe('getMenuClient',params.titulo));
		this.register("getSidebarMenuClient",Meteor.subscribe('getSidebarMenuClient',params.titulo));
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
		
		checkOwn(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'welcomeAdmin'});
	}
});

FlowRouter.route("/admin/:titulo/banner",{
	subscriptions : function(params,queryParams){
		this.register("getBanner",Meteor.subscribe('getBanner',params.titulo));
		

		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
		

	},
	action : function(params,queryParams) {
		checkOwn(params.titulo);	
		BlazeLayout.render("admin",{templateadmin:'banneradmin'});
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
		checkOwn(params.titulo);
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
		checkOwn(params.titulo);
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
		checkOwn(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'editarmenu'});
	}
});
FlowRouter.route("/admin/:titulo/contenido",{
	subscriptions : function(params,queryParams){
		//this.register("getSitios",Meteor.subscribe('getSitios'));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
	},
	action : function(params,queryParams) {
		checkOwn(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'contentadmin'});
	}
});

FlowRouter.route("/admin/:titulo/contenido/nuevo",{
	subscriptions : function(params,queryParams){
		//this.register("getSitios",Meteor.subscribe('getSitios'));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
	},
	action : function(params,queryParams) {
		checkOwn(params.titulo);
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
	},
	action : function(params,queryParams) {
		checkOwn(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'sidebaradmin'});
	}
});
FlowRouter.route("/admin/:titulo/sidebar/nuevomenuenlace",{
	subscriptions : function(params,queryParams){
		//this.register("getSitios",Meteor.subscribe('getSitios'));
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
	},
	action : function(params,queryParams) {
		checkOwn(params.titulo);
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
		checkOwn(params.titulo);
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
		checkOwn(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'editarenlace'});
	}
});

FlowRouter.route("/admin/:titulo/footer",{
	subscriptions : function(params,queryParams){
		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));
		this.register("getFooter",Meteor.subscribe('getFooter',params.titulo));
		

	},
	action : function(params,queryParams) {
		checkOwn(params.titulo);
		BlazeLayout.render("admin",{templateadmin:'footeradmin'});
	}

});