import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  //Publicaciones de ROOT
  Meteor.publish("getSitios",function(){
      // if () {} CONTROLAR PUBLICAION SOLO PARA EL ROOT
    return SITIO.find();
    });
  Meteor.publish("getUsers",function(){
    return Meteor.users.find();
    });
  //Publicaciones de ADMIN
  Meteor.publish("getSitiosAdmin",function(admin){
    return SITIO.find({admin:admin});

    });
  Meteor.publish("getSitio",function(idSitio){
    return SITIO.find({_id:idSitio});
    });

  Meteor.publish("getHeader",function(idSitio){
    return HEADER.find({idSitio:idSitio});

    });
  Meteor.publish("getBanner",function(idSitio){
    return BANNER.find({idSitio:idSitio});

    });
  Meteor.publish("getCarrusel",function(idSitio){
    return CARROUSEL.find({idSitio:idSitio});

    });
  
  Meteor.publish("getSidebar",function(idSitio){
    return SIDEBARMENU.find({idSitio:idSitio});

    });
  Meteor.publish("getMenu",function(idSitio){
    return MENU.find({idSitio:idSitio});

    });

  Meteor.publish("getNavbar",function(idSitio){
    return NAVBAR.find({idSitio:idSitio});
    });

  Meteor.publish("getMenuEnlace",function(idSitio){
    return MENUENLACE.find({idSitio:idSitio});
  });

  Meteor.publish("getEnlaces",function(idMenu){
    return ENLACE.find({idMenu:idMenu});
  });
  Meteor.publish("getFooter",function(idSitio){
    //console.log(idSitio);
    return FOOTER.find({idSitio:idSitio});
  });
  Meteor.publish("getSubmenu",function(idSitio){
    //console.log(idSitio);
    return SUBMENU.find({idSitio:idSitio});
  });
  Meteor.publish("getContenidos",function(idMenu){
    //console.log(idMenu);
    return CONTENIDO.find({idMenu:idMenu});
  });
  Meteor.publish("getContenido",function(idCont){
    //console.log(idMenu);
    return CONTENIDO.find({_id:idCont});
  });
  Meteor.publish("getOneMenu",function(idMenu){
    return MENU.find({_id:idMenu});

    });
  Meteor.publish("getOneSubmenu",function(idSubMenu){
  
    return SUBMENU.find({_id:idSubMenu});
  });
  Meteor.publish("getImages",function(){
    return IMAGES.find().cursor;
  });
  /////// Publicaciones de user
  Meteor.publish("getSitioClient",function(sitio){
    return SITIO.find({titulo:sitio});
    });
  Meteor.publish("getHeaderClient",function(titulo){
    var idSitio = SITIO.findOne({titulo:titulo});
    if (idSitio!=undefined) {
      return HEADER.find({idSitio:idSitio._id});
    }
    });

  Meteor.publish("getNavbarClient",function(titulo){
    var idSitio = SITIO.findOne({titulo:titulo});
    if (idSitio!=undefined) {
      return NAVBAR.find({idSitio:idSitio._id});
    }
  });
  Meteor.publish("getCarruselClient",function(titulo){
    var idSitio = SITIO.findOne({titulo:titulo});
    if (idSitio!=undefined) {
      return CARROUSEL.find({idSitio:idSitio._id});
    }
  });
  Meteor.publish("getBannerClient",function(titulo){
    var idSitio = SITIO.findOne({titulo:titulo});
    if (idSitio!=undefined) {
      return BANNER.find({idSitio:idSitio._id});
    }
    });
  Meteor.publish("getMenuClient",function(idNavbar){
      return MENU.find();
    
  });
  Meteor.publish("getSidebarClient",function(titulo){
    var idSitio = SITIO.findOne({titulo:titulo});
    if (idSitio!=undefined) {
      return SIDEBARMENU.find({idSitio:idSitio._id});
    }
  });
  Meteor.publish("getSidebarMenuClient",function(titulo){
    var idSitio = SITIO.findOne({titulo:titulo});
    if (idSitio!=undefined) {
      return MENUENLACE.find({idSitio:idSitio._id});
    }

  });
  Meteor.publish("getMenuenlaceClient",function(titulo){
    var idSitio = SITIO.findOne({titulo:titulo});
    if (idSitio!=undefined) {      
      return ENLACE.find({idSitio:idSitio._id});
    }

  });
  Meteor.publish("getFooterClient",function(titulo){
    var idSitio = SITIO.findOne({titulo:titulo});
    if (idSitio!=undefined) {
      return FOOTER.find({idSitio:idSitio._id});
    }

  });
  Meteor.publish("getSubmenuClient",function(titulo){
    var idSitio = SITIO.findOne({titulo:titulo});
    if (idSitio!=undefined) {
      return SUBMENU.find({idSitio:idSitio._id});
    }

  });
});