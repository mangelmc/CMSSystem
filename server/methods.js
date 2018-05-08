import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  
  Meteor.methods({
    /*/checkRootUser :function(user, email){
      var response = {};
      if (user=='root' && email=='root@gmail.com') {
        response = {res:true};

      }
      if (user=='root' && email!='root@gmail.com') {
        response = {res : false ,text : 'correo no disponible'};

      }
      if (user != 'root' && email == 'root@gmail.com') {
        response = {res : false ,text : 'usuario no disponible'};

      }
      return response;
    },/*/
    "checkLoginRoot" : function(user,email){
      var rootUs = Meteor.users.findOne({_id:this.userId,username:'root','emails.address':'root@gmail.com'});
      if (rootUs!=undefined) {
        Roles.addUsersToRoles(this.userId, ['root']);
        return true;
      }
      return false;
    },
    "checkRol" : function(){      
      if (Roles.userIsInRole(this.userId,'root')) {
        return {tipo:'root'};
      }
      if (Roles.userIsInRole(this.userId,'admin')) {
        return {tipo:'admin'};
      }
      return {tipo:'normal'};
    },
    setRol :function(rol,idUser){
      //is in role falta
      Roles.addUsersToRoles(idUser, [rol]);
      //console.log(idUser+'---'+rol);
    },
    ///////// SITIO METHODS BEGIN
    checkSitio : function (titulo){
      var sitio = SITIO.findOne({titulo:titulo});
      if (sitio == undefined+1) {
        return true;
      }
      return  false;
    },
    "insertSitio" : function(obj){
        //if(Meteor.userId()){ 
          //var idUs=this.userId;
          
          SITIO.insert(obj,function(error,result){
              var response = 'error en la insercion';
            	if (result) {
            		//console.log(result);
                HEADER.insert({
                  idSitio:result,titulo:obj.carrera,subtitulo:'Subtitulo del Sitio',tipoFondo:'ninguno',
                  fondo:'ninguno',fuente:'Arial',logo1:'logo1.jpg',logo2:'logo2.jpg',posicion:'up',tipo : 'default'
                });
                NAVBAR.insert({idSitio:result,color:'seablue',fuente:'Arial'});
                MENU.insert({nombre:"inicio",link:"/",tipo:'normal',idSitio:result,estado:"activo"});

                CUERPO.insert({idSitio:result,tipoFondo:'color',fondo:'white'});
                SIDEBARMENU.insert({idSitio:result,tipoFondo:'color',fondo:'skyblue',fuente:'Times New Roman',tipo:'default',html:'<div>Sidebar Personalizado </div>'});
                FOOTER.insert({idSitio:result, fuente:'Arial', texto:obj.carrera+' '+ new Date().getFullYear(),tipo:'default',html:'<div>Footer Personalizado </div>'});
                BANNER.insert({idSitio:result, tipo:'texto e imagen', texto:obj.carrera,imagen:'/students.jpg',textoPersonalizado:'<div class="bg-primary p-5 m-5" style="height:25vw"><span class="text-white">Texto Personalizado </span></div>'});
                response = "Se creó el Sitio Web " ;
               }
               if (error) {
                console.log(error);
               }
               return response;
            });
                          
        //}        
    },
    checkSiteRoute : function (idSitio){

      if (Roles.userIsInRole(this.userId,'admin')) {
        var sitioAdmin = SITIO.findOne({admin:this.userId,_id:idSitio});
        if (sitioAdmin != undefined) {
          return {check : true};
        }
        return {check : false,rol:'admin'};
      }  
      if (Roles.userIsInRole(this.userId, 'root') ) {       
          var sitio = SITIO.findOne({_id:idSitio});
          
          var sitioExist = false;       

          if (sitio != undefined) {
              sitioExist = true;
          }
          return {check : sitioExist,rol:'root'};
      }
      return {check : false,rol:''};
      
    },
    redirectUser : function (){

     
      if (Roles.userIsInRole(this.userId,'admin')) {
        
        return {res : true,rol:'admin'};
      }  
      if (Roles.userIsInRole(this.userId, 'root') ) {       
                  
          return {res : true,rol:'root'};
      }
      return {res:false,rol:''}; 
    },
    checkRolRoot : function(){
      if (Roles.userIsInRole(this.userId,'root')) {
        
        return {res : true };
      }
      if (Roles.userIsInRole(this.userId,'admin')) {
        
        return {res : false ,route : 'admin'};
      }
      return {res : false ,route : ''};
    },

    trackUser : function(obj){
       //console.log(this.connection);
      //ip = this.connection.clientAddress; en produccion
      //console.log(JSON.parse('http://jsonip.com?callback=?'));

      /*
      $.getJSON('http://jsonip.com?callback=?', function(json, textStatus) {
          
          console.log(json);
      });*/
      //return HTTP.get('http://jsonip.com?callback=?').data.ip;
      var ipLocal = this.connection.clientAddress;
    },

    crearAdmin : function (user){
      
      var newUser = {
        username : user.username,
        password : user.password,
        email : user.email,
        profile: {
          name: user.name,
          surname : user.surname,
          carrera : user.carrera,
          online : true,
          bloqueado : false,
          img : 'none'
        }
      };
       
      var account = Accounts.createUser(newUser);

      if (account) {
     
        Roles.addUsersToRoles(account, ['admin']);
      }
      //console.log(account);
      return account;
    },
    darEstado : function(id,estado){
      return SITIO.update({_id:id}, {$set:{estado:estado}});
    },
    changeAdmin : function (sitio,set){
      return SITIO.update(sitio, {$set:set});
      //console.log(change);
      
    },
    ////////SITIO METHODS BEGIN//////////

    ////////HEADER METHODS BEGIN//////////

    editHeader : function (id,obj){
      return HEADER.update({_id:id}, {$set:obj});
    },  
    
    ////////HEADER METHODS END//////////
    ////////BANNER METHODS BEGIN//////////
    bannerChange : function (id,obj){
      if (obj.tipo == 'carrusel') {
          var carrusel = CARROUSEL.findOne({idSitio : id});
          if (carrusel == undefined) {
            console.log(carrusel);
            CARROUSEL.insert({idSitio:id,titulo:'Titulo',texto:'Algun texto',imagen:'/students.jpg',link:''});
            CARROUSEL.insert({idSitio:id,titulo:'Titulo',texto:'Algun texto',imagen:'/graduacion.jpg',link:''});
          }
          //console.log('carrusel');
      }
      return BANNER.update({idSitio:id}, {$set:obj});
    },
    insertCarrusel : function(obj){ 
      var response= 'error';
      //console.log(contador);
      return CARROUSEL.insert(obj, function(e,r){
        if (e) {
          response = e;
          console.log(e);
        }if (r) {
          response = r;
          console.log(r);
        }
        return response;
      });      
    },
    editCarrusel : function (id,obj){
      return CARROUSEL.update({_id:id}, {$set:obj});
    },
    editBannerHtml :function(id,html){
      return BANNER.update({_id:id}, {$set:{textoPersonalizado:html}});
    }, 
    editBanner :function(id,obj){
      return BANNER.update({_id:id}, {$set:obj});
    },
    ////////BANNER METHODS END//////////
    ////////NAVBAR METHODS BEGIN//////////
    navbarChange : function (id,obj){
      return NAVBAR.update({idSitio:id}, {$set:obj});
    },
    insertMenu : function(obj){
      MENU.insert(obj,function(error,result){
        var res = 'error';
        if (result) {
          res = 'se inserto';
        }
        return res;
      } );
    },
    editMenu : function(id,obj){
      return MENU.update({_id:id}, {$set:obj});
    },
    darEstadoMenu : function(id,estado){
      return MENU.update({_id:id}, {$set:{estado:estado}});
    },
    darEstadoSubmenu : function(id,estado){
      return SUBMENU.update({_id:id}, {$set:{estado:estado}});
    },
    insSubmenu : function (obj){
      
      var response = 'error';
      //console.log(contador);
      return SUBMENU.insert(obj, function(e,r){
        if (e) {
          response = e;
          //console.log(e);
        }if (r) {
          response = r;
          //console.log(r);
        }
        return response;
      });    
    },
    editSubmenu : function (id,obj){
      
      return SUBMENU.update({_id:id},{$set:obj});      
    },
    ////////NAVBAR METHODS END//////////
    ////////CONTENT METHODS BEGIN//////////
    insContent : function(obj){
      return CONTENIDO.insert(obj);
    },
    editContent : function (idCont,obj){
      return  CONTENIDO.update({_id : idCont}, {$set:obj});
    },
    visibilityContent : function(idCont,obj){
      return CONTENIDO.update({_id : idCont}, {$set : obj});
    },
    ////////CONTENT METHODS END//////////
    ////////SIDEBAR METHODS BEGIN//////////
    sidebarChange : function (idSitio,obj){      
      return SIDEBARMENU.update({idSitio:idSitio}, {$set:obj});
    },
    editsidebarHtml  : function(idSitio,obj){
    
      return SIDEBARMENU.update({idSitio:idSitio},{$set:obj});
    },
    insMenuEnlace : function (obj){
      var contador = MENUENLACE.find({idSitio:obj.idSitio}).count();
      var response = 'error';
      //console.log(contador);
      return MENUENLACE.insert({idSitio:obj.idSitio,nombre:obj.nombre,posicion:contador+1,estado:'Activo'}, function(e,r){
        if (e) {
          response = e;
          console.log(e);
        }if (r) {
          response = r;
          //console.log('menuenlace inserted with _id '+r);
        }
        return response;
      });
      
    },
    darEstadoSidebar : function (id,estado){
      return MENUENLACE.update({_id:id},{$set:{estado:estado}});      
    },
      
    
    insEnlace : function(obj){
      var response= 'error';
      return ENLACE.insert(obj, function(e,r){
        if (e) {
          response = e;
          console.log(e);
        }if (r) {
          response = r;
          //console.log(r);
        }
        return response;
      });
    },
    editmenuenlace : function(nombre,idmenu){
      
      return MENUENLACE.update({_id:idmenu}, {$set:{nombre:nombre}});
    },
    editEnlace : function(obj,idenlace){
      
      return ENLACE.update({_id:idenlace}, {$set:obj});
    },
    eliEnlace  : function(idenlace){
      var response = false;
      return ENLACE.remove({_id:idenlace});
    },

    //////// SIDEBAR METHODS END //////////

    ////////FOOTER METHODS BEGIN//////////
    editFooter : function(texto,idfooter){
    
      return FOOTER.update({_id:idfooter},{$set:{texto:texto}});
    },
    editFooterHtml  : function(idSitio,obj){
    
      return FOOTER.update({idSitio:idSitio},{$set:obj});
    },
    footerChange : function (id,obj){      
      return FOOTER.update({idSitio:id}, {$set:obj});
    },

  });

});

