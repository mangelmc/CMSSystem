import {
  Meteor
} from 'meteor/meteor';
import {
  publishComposite
} from 'meteor/reywood:publish-composite';
/* import {
  BANNER
} from '../collections/cmscollections'; */

Meteor.startup(() => {
  // code to run on server at startup
  //Publicaciones de ROOT
  Meteor.publish("getSitios", function () {
    return SITIO.find();
  });
  Meteor.publish("getUsers", function () {
    if (Roles.userIsInRole(this.userId, ['root'])) {
      return Meteor.users.find();
    }
  });
  //Publicaciones de ADMIN
  Meteor.publish("getSitiosAdmin", function (admin) {
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return SITIO.find({
        admin: admin
      });
    }
  });
  Meteor.publish("getSitio", function (idSitio) {
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return SITIO.find({
        _id: idSitio
      });
    }
  });

  Meteor.publish("getHeader", function (idSitio) {
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return HEADER.find({
        idSitio: idSitio
      });
    }

  });
  Meteor.publish("getBanner", function (idSitio) {
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return BANNER.find({
        idSitio: idSitio
      });
    }
  });
  Meteor.publish("getCarrusel", function (idSitio) {
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return CARROUSEL.find({
        idSitio: idSitio
      });
    }
  });

  Meteor.publish("getSidebar", function (idSitio) {
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return SIDEBARMENU.find({
        idSitio: idSitio
      });
    }
  });
  Meteor.publish("getMenu", function (idSitio) {
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return MENU.find({
        idSitio: idSitio
      });
    }
  });

  Meteor.publish("getNavbar", function (idSitio) {
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return NAVBAR.find({
        idSitio: idSitio
      });
    }
  });
  Meteor.publish("getCuerpo", function (idSitio) {
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return CUERPO.find({
        idSitio: idSitio
      });
    }
  });
  Meteor.publish("getMenuEnlace", function (idSitio) {
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return MENUENLACE.find({
        idSitio: idSitio
      });
    }
  });

  Meteor.publish("getEnlaces", function (idMenu) {
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return ENLACE.find({
        idMenu: idMenu
      });
    }
  });
  Meteor.publish("getFooter", function (idSitio) {
    //console.log(idSitio);
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return FOOTER.find({
        idSitio: idSitio
      });
    }
  });
  Meteor.publish("getFooterLinks", function (idSitio) {
    //console.log(idSitio);
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return FOOTERLINKS.find({
        idSitio: idSitio
      });
    }
  });
  Meteor.publish("getSubmenu", function (idSitio) {
    //console.log(idSitio);
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return SUBMENU.find({
        idSitio: idSitio
      });
    }
  });
  Meteor.publish("getContenidos", function (idMenu) {
    //console.log(idMenu);
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return CONTENIDO.find({
        idMenu: idMenu
      });
    }
  });
  Meteor.publish("getContenido", function (idCont) {
    //console.log(idMenu);
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return CONTENIDO.find({
        _id: idCont
      });
    }
  });
  Meteor.publish("getOneMenu", function (idMenu) {
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return MENU.find({
        _id: idMenu
      });
    }
  });
  Meteor.publish("getOneSubmenu", function (idSubMenu) {
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return SUBMENU.find({
        _id: idSubMenu
      });
    }
  });
  Meteor.publish("getImages", function (idSitio) {
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return IMAGES.find({
        idSitio: idSitio
      });
    }
  });
  Meteor.publish("getVideos", function (idSitio) {
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return VIDEOS.find({
        idSitio: idSitio
      });
    }
  });
  Meteor.publish("getArchivos", function (idSitio) {
    if (Roles.userIsInRole(this.userId, ['root', 'admin'])) {
      return ARCHIVOS.find({
        idSitio: idSitio
      });
    }
  });
  /////// Publicaciones de Usuario normal
  Meteor.publish("getSitioClient", function (sitio) {
    return SITIO.find({
      titulo: sitio
    });
  });
  Meteor.publish("getHeaderClient", function (titulo) {
    var idSitio = SITIO.findOne({
      titulo: titulo
    });
    if (idSitio != undefined) {
      return HEADER.find({
        idSitio: idSitio._id
      });
    }
  });

  Meteor.publish("getNavbarClient", function (titulo) {
    var idSitio = SITIO.findOne({
      titulo: titulo
    });
    if (idSitio != undefined) {
      return NAVBAR.find({
        idSitio: idSitio._id
      });
    }
  });
  Meteor.publish("getCarruselClient", function (titulo) {
    var idSitio = SITIO.findOne({
      titulo: titulo
    });
    if (idSitio != undefined) {
      return CARROUSEL.find({
        idSitio: idSitio._id
      });
    }
  });
  Meteor.publish("getBannerClient", function (titulo) {
    var idSitio = SITIO.findOne({
      titulo: titulo
    });
    if (idSitio != undefined) {
      return BANNER.find({
        idSitio: idSitio._id
      });
    }
  });
  Meteor.publish("getMenuClient", function (titulo) {
    var idSitio = SITIO.findOne({
      titulo: titulo
    });
    if (idSitio != undefined) {
      return MENU.find({
        idSitio: idSitio._id
      });
    }

  });
  Meteor.publish("getCuerpoClient", function (titulo) {
    //console.log(titulo);
    var idSitio = SITIO.findOne({
      titulo: titulo
    });
    if (idSitio != undefined) {
      //console.log(CUERPO.find({idSitio:idSitio._id}));
      return CUERPO.find({
        idSitio: idSitio._id
      });
    }

  });
  Meteor.publish("getSidebarClient", function (titulo) {
    var idSitio = SITIO.findOne({
      titulo: titulo
    });
    if (idSitio != undefined) {
      return SIDEBARMENU.find({
        idSitio: idSitio._id
      });
    }
  });
  Meteor.publish("getSidebarMenuClient", function (titulo) {
    var idSitio = SITIO.findOne({
      titulo: titulo
    });
    if (idSitio != undefined) {
      return MENUENLACE.find({
        idSitio: idSitio._id
      });
    }

  });
  Meteor.publish("getMenuenlaceClient", function (titulo) {
    var idSitio = SITIO.findOne({
      titulo: titulo
    });
    if (idSitio != undefined) {
      return ENLACE.find({
        idSitio: idSitio._id
      });
    }

  });
  Meteor.publish("getFooterClient", function (titulo) {
    var idSitio = SITIO.findOne({
      titulo: titulo
    });
    if (idSitio != undefined) {
      return FOOTER.find({
        idSitio: idSitio._id
      });
    }

  });
  Meteor.publish("getFooterLinksClient", function (titulo) {
    var idSitio = SITIO.findOne({
      titulo: titulo
    });
    if (idSitio != undefined) {
      return FOOTERLINKS.find({
        idSitio: idSitio._id
      });
    }

  });
  Meteor.publish("getSubmenuClient", function (titulo) {
    var idSitio = SITIO.findOne({
      titulo: titulo
    });
    if (idSitio != undefined) {
      return SUBMENU.find({
        idSitio: idSitio._id
      });
    }
    //console.log(idSitio);
  });

  Meteor.publish("getContenidosMenuClient", function (tituloSitio, linkMenu) {
    //por el momento solo menus en el caso de ser submenus deberia hacerse de otra manera menu y submenu ambos 

    var sitio = SITIO.findOne({
      titulo: tituloSitio
    });
    //CONTRLAR INDEF
    var menu = MENU.findOne({
      link: linkMenu,
      idSitio: sitio._id
    });


    if (menu != undefined && sitio != undefined) {
      //console.log(CONTENIDO.find({idMenu : menu._id}).fetch());
      return CONTENIDO.find({
        idMenu: menu._id
      });
    }
  });
  Meteor.publish("getContenidosSubmenuClient", function (tituloSitio, linkSubmenu) {
    //por el momento solo menus en el caso de ser submenus deberia hacerse de otra manera menu y submenu ambos 

    var sitio = SITIO.findOne({
      titulo: tituloSitio
    });
    //CONTRLAR INDEF
    var submenu = SUBMENU.findOne({
      link: linkSubmenu,
      idSitio: sitio._id
    });


    if (submenu != undefined && sitio != undefined) {
      //console.log(CONTENIDO.find({idMenu : menu._id}).fetch());
      return CONTENIDO.find({
        idMenu: submenu._id
      });

    }
  });
  //RECIBIR NOMBRE PARAMETRO
  Meteor.publish("getHomeContentClient", function (titulo) {
    var sitio = SITIO.findOne({
      titulo: titulo
    });
    if (sitio != undefined) {
      var menu = MENU.findOne({
        nombre: "INICIO",
        idSitio: sitio._id
      });
      return CONTENIDO.find({
        idSitio: sitio._id,
        idMenu: menu._id,
        visible: "visible"
      }, {
        limit: 2
      });
    }
  });
  Meteor.publish("getHomeContentClient1", function (titulo) {
    var sitio = SITIO.findOne({
      titulo: titulo
    });
    if (sitio != undefined) {
      var menu = MENU.findOne({
        nombre: "BOLETINES",
        idSitio: sitio._id
      });
      return CONTENIDO.find({
        idSitio: sitio._id,
        idMenu: menu._id,
        visible: "visible"
      }, {
        limit: 2
      });
    }
  });
  Meteor.publish("getHomeContentClient2", function (titulo) {
    var sitio = SITIO.findOne({
      titulo: titulo
    });
    if (sitio != undefined) {
      var menu = MENU.findOne({
        nombre: "EVENTOS",
        idSitio: sitio._id
      });
      return CONTENIDO.find({
        idSitio: sitio._id,
        idMenu: menu._id,
        visible: "visible"
      }, {
        limit: 4
      });
    }
  });
  Meteor.publish("getMContentClient", function (titulo, menu, contenido) {


    var sitio = SITIO.findOne({
      titulo: titulo
    });

    var ruta = menu + "/m/" + contenido;
    //console.log(ruta);
    if (sitio != undefined) {
      var menu = MENU.findOne({
        link: menu,
        idSitio: sitio._id
      });
      return CONTENIDO.find({
        idSitio: sitio._id,
        idMenu: menu._id,
        ruta: ruta
      });
    }
  });

  Meteor.publish("getSContentClient", function (titulo, menu, submenu, contenido) {
    var sitio = SITIO.findOne({
      titulo: titulo
    });
    var ruta = menu + "/" + submenu + "/" + contenido;
    //console.log(ruta);
    if (sitio != undefined) {
      var submenu = SUBMENU.findOne({
        link: submenu,
        idSitio: sitio._id
      });
      return CONTENIDO.find({
        idSitio: sitio._id,
        idMenu: submenu._id,
        ruta: ruta
      });
    }
  });
  publishComposite("getComentsClient", function (titulo, link, contenido, menuData) {

    var sitio = SITIO.findOne({
      titulo: titulo
    });

    var menu;
    //console.log(link);
    var content = undefined;
    //console.log(sitio._id +' sitio --'+ menuData);
    var ruta = ""
    if (menuData == 'menuonly') {
      menu = MENU.findOne({
        link: link,
        idSitio: sitio._id
      });
      ruta = link + "/m/" + contenido;
    } else {
      menu = SUBMENU.findOne({
        link: link,
        idSitio: sitio._id
      });

      ruta = menuData + "/" + link + "/" + contenido;
    }
    //console.log(ruta, ' res');

    if (sitio != undefined && menu != undefined) {
      content = CONTENIDO.findOne({
        ruta: ruta,
        idMenu: menu._id,
        idSitio: sitio._id
      });
    }
    if (content != undefined && sitio != undefined && menu != undefined) {
      return {
        find() {
          return COMENTARIO.find({
            idContenido: content._id,
            estado: 'visible'
          });
        },
        children: [{
          find(coment) {
            // Find post author. Even though we only want to return
            // one record here, we use "find" instead of "findOne"
            // since this function should return a cursor.
            return Meteor.users.find({
              _id: coment.idUsuario
            }, {
              fields: {
                profile: 1,
                username: 1
              }
            });
          }
        }]
      }

    } else {
      console.log('error al publicar comentarios');
    }

  });
  /*Meteor.publish("getSearchContent", (titulo, searchText) => {
    console.log(titulo);
    console.log(searchText);
    var idSitio = SITIO.findOne({
      titulo: titulo
    });
    //console.log(idSitio);
    if (idSitio != undefined && searchText != "/>[^<]{0,}[^>]{0,}</i") {
      var sitiosSearch = CONTENIDO.find({
        $or: [{
            contenidoHtml: {
              $regex: searchText
            }
          },
          {
            descripcion: {
              $regex: searchText
            }
          },
          {
            titulo: {
              $regex: searchText
            }
          }
        ],
        idSitio: idSitio._id

      });
      //console.log(sitiosSearch.fetch());
      return sitiosSearch;
    }
    console.log('nothing');
    return false;
  });*/
  Meteor.publish("getSearchContent", (titulo, searchText) => {
    //console.log(titulo);
    //console.log(searchText);
    var idSitio = SITIO.findOne({
      titulo: titulo
    });
    //console.log(idSitio);
    if (idSitio != undefined && searchText != "") {
      return CONTENIDO.find({
        $text: {
          $search: searchText,
          //$language: "es"
        },
        idSitio: idSitio._id

      });


    }
    //console.log('nothing');
    return false;
  });

});