import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  reCAPTCHA.config({
        privatekey: '6Lch5V0UAAAAAGqdgRz-LfpnUnJWrZ9SRmR6JBOL'
    });
  Meteor.methods({
    checkBan : function(){
      var user = Meteor.users.findOne({_id:this.userId,'profile.bloqueado':true});      
      if (user!=undefined) {
        return true;
      }
      return false;
    },
    checkCaptcha: function(captchaData) {

        var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);
        //console.log(verifyCaptchaResponse);
        if (!verifyCaptchaResponse.success) {
            //console.log('reCAPTCHA check failed!', verifyCaptchaResponse);
            throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + (verifyCaptchaResponse.error || "Timeout or duplicate"));
            return  false;
        } else{
          //console.log('reCAPTCHA verification passed!');
          return true;
        }
    },
    "checkLoginRoot" : function(user,email){
      var rootUs = Meteor.users.findOne({_id:this.userId,username:'root','emails.address':'root@gmail.com'});
      if (rootUs!=undefined) {
        Roles.addUsersToRoles(this.userId, ['root']);
        return true;
      }
      return false;
    },
    checkRol : function(){      
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
    changeRol :function(rol,idUser){
      //is in role falta
      Roles.setUserRoles(idUser, [rol]);
      //console.log(idUser+'---'+rol);
      return true;
    },
    ///////// SITIO METHODS BEGIN
    checkSitio : function (titulo){
      var sitio = SITIO.findOne({titulo:titulo});
      if (sitio == undefined+1) {
        return true;
      }
      return  false;
    },
    checkIfExistSitio : function (titulo){
      var sitio = SITIO.findOne({titulo : titulo});
      if (sitio != undefined) {
        return true;
      }
      return false;
    },
    checkIfExistMenu : function (link){
      var menu = MENU.findOne({link : link});
      if (menu != undefined) {
        return true;
      }
      return false;
    },
    insertSitio : function(obj){
      var response = 'error en la insercion';
      return SITIO.insert(obj,function(error,result){          
        	if (result) {
            HEADER.insert({
              idSitio:result,titulo:obj.carrera,subtitulo:'Subtitulo del Sitio',tipoFondo:'ninguno',
              fondo:'ninguno',fuente:'Arial',logo1:'logo1.jpg',logo2:'logo2.jpg',posicion:'up',tipo : 'default'
            });
            NAVBAR.insert({idSitio:result,color:'seablue',fuente:'Arial'});
            MENU.insert({nombre:"INICIO",link:"/",tipo:'normal',idSitio:result,estado:"activo",contenido : "Si"});
            MENU.insert({nombre:"EVENTOS",link:"eventos",tipo:'normal',idSitio:result,estado:"activo",contenido : "Si"});
            MENU.insert({nombre:"BOLETINES",link:"boletines",tipo:'normal',idSitio:result,estado:"activo",contenido : "Si"});
            CUERPO.insert({idSitio:result,tipoFondo:'color',fondo:'#f5f6f8'});
            SIDEBARMENU.insert({
              idSitio:result,tipoFondo:'color',fondo:'seablue',fuente:'Times New Roman',tipo:'default',html:'<div>Sidebar Personalizado </div>'
            });
            FOOTER.insert({
              idSitio:result, fuente:'Arial', texto:obj.carrera+' '+ new Date().getFullYear(),tipo:'default',html:'<div>Footer Personalizado </div>'
            });
            BANNER.insert({
              idSitio:result, tipo:'texto e imagen', 
              texto:obj.carrera,imagen:'/students.jpg',
              textoPersonalizado:'<div class="bg-primary p-5 m-5" style="height:25vw"><span class="text-white">Texto Personalizado </span></div>'
            });
            response = "Se creó el Sitio Web" ;
          }
          if (error) {
            console.log(error);
          }
          return response;
        });    
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

    crearUser : function (user,rol){      
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
        Roles.addUsersToRoles(account, [rol]);
      }     
      return account;
    },
    darEstado : function(id,estado){
      return SITIO.update({_id:id}, {$set:{estado:estado}});
    },
    changeAdmin : function (sitio,set){
      return SITIO.update(sitio, {$set:set});
      //console.log(change);
      
    },
    setNewPassword : function(userId,newPassword){
      
      Accounts.setPassword(userId, newPassword,{logout:false});
      return true; 
    },
    editUser : function (id,obj){
      //console.log(id);
      return Accounts.users.update({_id:id}, {$set:obj});
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
            CARROUSEL.insert({
              idSitio:id,titulo:'Titulo',texto:'Algun texto',imagen:'/students.jpg',link:''
            });
            CARROUSEL.insert({
              idSitio:id,titulo:'Titulo',texto:'Algun texto',imagen:'/graduacion.jpg',link:''
            });
          }
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
      var res = 'error';
      return MENU.insert(obj,function(error,result){        
        if (result) {
          res = 'se inserto el menu';
        }
        return res;
      });
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
      return SUBMENU.insert(obj, function(e,r){
        if (e) {
          response = e;
        }if (r) {
          response = r;
        }
        return response;
      });    
    },
    editSubmenu : function (id,obj){
      
      return SUBMENU.update({_id:id},{$set:obj});      
    },
    ////////NAVBAR METHODS END//////////
    ////////CONTENT METHODS BEGIN//////////
    changeColorBody : function (idSitio,color){
      return  CUERPO.update({idSitio : idSitio}, {$set:{fondo : color}});
    },
    insContent : function(obj){      
      var response= 'error';
      return CONTENIDO.insert(obj, function(e,r){
        if (e) {
          response = e;
          console.log(e);
        }if (r) {
          response = "Se inserto el contenido";
          MENU.update({_id : obj.idMenu}, {$set : {contenido : 'Si'}});
        }
        return response;
      });
    },
    editContent : function (idCont,obj){
      return  CONTENIDO.update({_id : idCont}, {$set:obj});
    },
    visibilityContent : function(idCont,obj){
      return CONTENIDO.update({_id : idCont}, {$set : obj});
    },

    insComentario : function(obj){
      return COMENTARIO.insert(obj);
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
      return MENUENLACE.insert({
        idSitio:obj.idSitio,nombre:obj.nombre,posicion:contador+1,estado:'Activo'
      }, function(e,r){
        if (e) {
          console.log(e);
        }if (r) {
          response = r;
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
    insLinkFooter : function(obj){
      var response= 'error';
      return FOOTERLINKS.insert(obj, function(e,r){
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
    editLinkFooter : function (idlink,obj){      
      return FOOTERLINKS.update({_id : idlink}, {$set:obj});
    },
    eliLinkFooter : function (idlink){      
      return FOOTERLINKS.remove({_id : idlink});
    },
    //////// SITE METHODS BEGIN //////////
    insComentario : function(obj){
      var response= 'error';
      return COMENTARIO.insert(obj, function(e,r){
        if (e) {
          response = e;
          console.log(e);
        }if (r) {
          response = r;
          //console.log(r);
        }
        return response;
      });
    }


    ////////SITE METHODS END//////////
  });

});

