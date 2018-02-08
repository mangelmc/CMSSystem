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
BANNER.attachSchema(bannerSchema);

NAVBAR = new Mongo.Collection('navbar')

var navbarSchema =new SimpleSchema({
    
    idSitio :{
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
    idMenu :{
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
    
    idSitio :{
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

// REVISAR SIDEBAR
SIDEBARMENU = new Mongo.Collection('sidebarmenu')

var sidebarMenuSchema =new SimpleSchema({
    
    idSitio :{
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
    
    idSitio:{
        type:String,
    }, 
    idMenu :{
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
    }
});
FOOTER.attachSchema(footerSchema);

