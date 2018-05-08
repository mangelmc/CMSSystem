import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import {Mongo} from "meteor/mongo";

//import { FilesCollection } from 'meteor/ostrio:files';
SITIO = new Mongo.Collection('sitio');

var sitioSchema =new SimpleSchema({

    titulo : {
        type:String,
    },
    carrera : {
        type : String
    },
    creado: {
        type : Date,
        autoValue: function	(){
        	return new Date();
        }
    },
    estado : {
        type : String
    },
    admin : {
        type : String
    }

});
SITIO.attachSchema(sitioSchema);


BANNER = new Mongo.Collection('banner')

var bannerSchema =new SimpleSchema({
    idSitio :{
        type:String,
    },
    tipo : {
        type:String,//DEFAULT TEXTO E IMAGEN
    },
    texto :{
        type:String,//titulo o lorem ipsum
    },
    imagen :{
        type:String,//link de una imagen por defecto
    },
    textoPersonalizado :{
        type:String,// la parte de html libre
    },

});

BANNER.attachSchema(bannerSchema);

CARROUSEL = new Mongo.Collection('carrousel') ///SE asocia directamnet al sitio ¡¡¡ solo un carrusel

var carrouselSchema =new SimpleSchema({
    idSitio :{
        type:String,
    },
    titulo : {
        type:String,//DEFAULT TEXTO E IMAGEN
    },
    texto :{
        type:String,//
    },
    imagen :{
        type:String,//link de una imagen por defecto
    },
    link:{
        type:String,//link del boton
        optional : true
    },
});

CARROUSEL.attachSchema(carrouselSchema);

HEADER = new Mongo.Collection('header')

var headerSchema =new SimpleSchema({

    idSitio :{
        type:String,
    },
    titulo : {
        type:String,
    },
    subtitulo : {
        type : String,
        optional : true
    },
    tipoFondo : {
        type : String //si es color o imagen
    },
    fondo : {
        type : String //link o el color
    },
    fuente : {
        type:String
    },
    logo1 : {
        type : String,
        optional : true
    },
    logo2 : {
        type : String,
        optional : true
    },
    posicion : {
        type : String,
    }
});
HEADER.attachSchema(headerSchema);

NAVBAR = new Mongo.Collection('navbar')

var navbarSchema =new SimpleSchema({
    idSitio : {
        type:String,
    },
    color : {
        type : String
    },
    fuente : {
        type : String
    }
});
NAVBAR.attachSchema(navbarSchema);

MENU = new Mongo.Collection('menu')

var menuSchema = new SimpleSchema({

    /*idNavbar :{
        type:String,
    },---- mientars no haya problema con referencia al navbar*/
    nombre : {
        type:String,
    },
    link : {
        type : String
    },
    tipo : {
        type : String //normal o con submenu
    },
    idSitio : {
        type : String //aqui va ekl id del sitio
    },
    estado : {
        type : String //activo o inactivo
    }

});
MENU.attachSchema(menuSchema);

SUBMENU = new Mongo.Collection('submenu')

var submenuSchema =new SimpleSchema({
    idSitio : {
        type:String,
    },
    idMenu : {
        type:String,
    },
    nombre : {
        type:String,
    },
    link : {
        type : String
    },
    estado : {
        type : String //activo o inactivo
    }
});
SUBMENU.attachSchema(submenuSchema);
// Aqui termna todo del navbar

CUERPO = new Mongo.Collection('cuerpo')

var cuerpoSchema =new SimpleSchema({

    idSitio : {
        type:String,
    },
    tipoFondo : {
    	type : String //si es color o imagen
    },
    fondo : {
    	type : String //link o el color
    }
});
CUERPO.attachSchema(cuerpoSchema);

CONTENIDO = new Mongo.Collection('contenido')

var contenidoSchema =new SimpleSchema({
    
    idSitio : {
        type:String,
    },
    idMenu : {
        type:String,
    },
    tipo : {
        type : String
    },
    
    titulo : {
        type : String
    },
    texto : {type : String},
    //dar la opcion de poner multiples imgs o files
    idImagen : {
        type : String,
        optional : true
    },
    idArchivo : {
       type : String,
       optional : true 
    },
    comentarios : {
        type : String
    },
    visible : {
        type : String
    }
});
CONTENIDO.attachSchema(contenidoSchema);

// REVISAR SIDEBAR
SIDEBARMENU = new Mongo.Collection('sidebarmenu')

var sidebarMenuSchema =new SimpleSchema({

    idSitio : {
        type:String,
    },
    tipoFondo : {
    	type : String //si es color o imagen
    },
    fondo : {
    	type : String //link de la imagen o el color
    },
    fuente : {
        type : String
    },
    tipo :  {
        type : String
    },
    html :  {
        type : String,
        optional : true
    },
});

SIDEBARMENU.attachSchema(sidebarMenuSchema);

MENUENLACE =new Mongo.Collection('menuenlace')

var menuenlaceSchema =new SimpleSchema({

    idSitio :{
        type:String,
    },
    nombre : {
        type : String
    },
    posicion : {
        type : String
    },
    estado : {
        type : String
    }
});
MENUENLACE.attachSchema(menuenlaceSchema);

ENLACE =new Mongo.Collection('enlace')

var enlaceSchema =new SimpleSchema({

    idSitio : {
        type:String,
    },
    idMenu : {
        type:String,
    },
    nombre : {
        type : String
    },
    url : {
        type : String
    }
});
ENLACE.attachSchema(enlaceSchema);


FOOTER = new Mongo.Collection('footer')

var footerSchema =new SimpleSchema({

    idSitio :{
        type:String,
    },
    //el fondo es copia del navbar
    fuente : {
        type : String
    },
    texto : {
    	type : String // pore el momento se pueden add mas cosas (menus.etc)
    },
    tipo : {
        type : String // tipo de footer default o personalizado
    },
    html : {
        type : String, // codigo html personalizado
        optional: true
    },

});
FOOTER.attachSchema(footerSchema);


//Archivos con ostrio


IMAGES = new FilesCollection({
  collectionName: 'images',
  allowClientCode: false, // Disallow remove files from Client
  storagePath : 'C:/Users/MIke/data',
  downloadRoute : 'C:/Users/MIke/data/downloads',
  allowClient : false,
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    return IMAGES.find().cursor;
  });
}
