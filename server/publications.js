import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';

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
  Meteor.publish("getCuerpo",function(idSitio){
    return CUERPO.find({idSitio:idSitio});
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
  Meteor.publish("getFooterLinks",function(idSitio){
    //console.log(idSitio);
    return FOOTERLINKS.find({idSitio:idSitio});
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
  Meteor.publish("getImages",function(idSitio){
    return IMAGES.find({'meta.idSitio' : idSitio}).cursor;
  });
  Meteor.publish("getVideos",function(idSitio){
    return VIDEOS.find({'meta.idSitio' : idSitio}).cursor;
  });
  Meteor.publish("getArchivos",function(idSitio){
    return ARCHIVOS.find({'meta.idSitio' : idSitio}).cursor;
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
  Meteor.publish("getMenuClient",function(titulo){
    var idSitio = SITIO.findOne({titulo:titulo});
    if (idSitio!=undefined) {
      return MENU.find({idSitio:idSitio._id});
    }
    
  });
  Meteor.publish("getCuerpoClient",function(titulo){
    //console.log(titulo);
    var idSitio = SITIO.findOne({titulo:titulo});
    if (idSitio!=undefined) {
      //console.log(CUERPO.find({idSitio:idSitio._id}));
      return CUERPO.find({idSitio:idSitio._id});
    }
    
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
  Meteor.publish("getFooterLinksClient",function(titulo){
    var idSitio = SITIO.findOne({titulo:titulo});
    if (idSitio!=undefined) {
      return FOOTERLINKS.find({idSitio:idSitio._id});
    }

  });
  Meteor.publish("getSubmenuClient",function(titulo){
    var idSitio = SITIO.findOne({titulo:titulo});
    if (idSitio!=undefined) {
      return SUBMENU.find({idSitio:idSitio._id});
    }

  });

  Meteor.publish("getContenidosMenuClient",function(tituloSitio , linkMenu){
    //por el momento solo menus en el caso de ser submenus deberia hacerse de otra manera menu y submenu ambos 
    
    var sitio = SITIO.findOne({titulo : tituloSitio});
    //CONTRLAR INDEF
    var menu = MENU.findOne({link : linkMenu, idSitio : sitio._id});
    

    if (menu != undefined && sitio != undefined) {
      //console.log(CONTENIDO.find({idMenu : menu._id}).fetch());
      return CONTENIDO.find({idMenu : menu._id});
    
    }
  });
  Meteor.publish("getContenidosSubmenuClient",function(tituloSitio , linkSubmenu){
    //por el momento solo menus en el caso de ser submenus deberia hacerse de otra manera menu y submenu ambos 
    
    var sitio = SITIO.findOne({titulo : tituloSitio});
    //CONTRLAR INDEF
    var submenu = SUBMENU.findOne({link : linkSubmenu, idSitio : sitio._id});
    

    if (submenu != undefined && sitio != undefined) {
      //console.log(CONTENIDO.find({idMenu : menu._id}).fetch());
      return CONTENIDO.find({idMenu : submenu._id});
    
    }
  });
  //RECIBIR NOMBRE PARAMETRO
  Meteor.publish("getHomeContentClient1",function(titulo){
    var sitio = SITIO.findOne({titulo:titulo});
     if (sitio!=undefined) {
      var menu = MENU.findOne({nombre : "BOLETINES", idSitio : sitio._id});
      return CONTENIDO.find({idSitio:sitio._id,idMenu : menu._id,visible:"visible"},{limit : 2});
    }
  });
  Meteor.publish("getHomeContentClient2",function(titulo){
    var sitio = SITIO.findOne({titulo:titulo});
     if (sitio!=undefined) {
      var menu = MENU.findOne({nombre : "EVENTOS", idSitio : sitio._id});
      return CONTENIDO.find({idSitio:sitio._id,idMenu : menu._id,visible:"visible"},{limit : 4});
    }
  });
  Meteor.publish("getMContentClient",function(titulo,menu,contenido){
    var sitio = SITIO.findOne({titulo:titulo});
     if (sitio!=undefined) {
      var menu = MENU.findOne({link : menu, idSitio : sitio._id});
      return CONTENIDO.find({idSitio:sitio._id,idMenu : menu._id, ruta : contenido});
    }
  });

  Meteor.publish("getSContentClient",function(titulo,submenu,contenido){
    var sitio = SITIO.findOne({titulo:titulo});
    
    if (sitio!=undefined) {
      var submenu = SUBMENU.findOne({link : submenu, idSitio : sitio._id});
      return CONTENIDO.find({idSitio:sitio._id,idMenu : submenu._id, ruta : contenido});
    }
  });
  publishComposite("getComentsClient",function(ruta){
    var content = CONTENIDO.findOne({ruta:ruta});
    console.log(CONTENIDO.find({ruta:ruta}).fetch());
    //aumentar id sitio y si es mejor id menu
    if (content!=undefined) {
      return {
        find() {
            
            return COMENTARIO.find({idContenido : content._id,estado : 'visible'});
        },
        children: [{
            find(coment) {
                // Find post author. Even though we only want to return
                // one record here, we use "find" instead of "findOne"
                // since this function should return a cursor.
                return Meteor.users.find(
                    { _id: coment.idUsuario },
                    { fields: { profile: 1 ,username:1} });
            }
        }]
    }
      
    }else{
      console.log(content);
    }
    
  });
  
});

