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
      var currentUser = Meteor.users.findOne({_id:this.userId});
      var sitio = SITIO.findOne({admin:this.userId});
        if (currentUser != undefined && currentUser.roles != undefined && currentUser.roles[0]=='root') {
          return {tipo:'root'};
        }
        if (currentUser != undefined && currentUser.roles != undefined  && currentUser.roles[0]=='admin') {
          return {tipo:'admin',idSitio:sitio._id,titulo:sitio.titulo};
        }
      return {tipo:'normal'};
    },
    setRol :function(rol,idUser){
      //is in role falta
      Roles.addUsersToRoles(idUser, [rol]);
      //console.log(idUser+'---'+rol);
    },
    ///////// SITIO METHODS BEGIN
    "insertSitio" : function(obj){
        //if(Meteor.userId()){ 
          //var idUs=this.userId;
            SITIO.insert(obj,function(error,result){
            	if (result) {
            		//console.log(result);
                BANNER.insert({
                  idSitio:result,titulo:obj.carrera,subtitulo:'Subtitulo del Sitio',tipoFondo:'ninguno',fondo:'ninguno',fuente:'Arial',logo1:'logo1.jpg',logo2:'logo2.jpg',posicion:'up'
                });
                NAVBAR.insert({idSitio:result,color:'black',fuente:'Arial'});
                CUERPO.insert({idSitio:result,tipoFondo:'color',fondo:'white'});
                SIDEBARMENU.insert({idSitio:result,tipoFondo:'color',fondo:'skyblue',fuente:'Times New Roman'});
                FOOTER.insert({idSitio:result, fuente:'Arial', texto:obj.carrera+'2017'});


               }
               if (error) {
                console.log(error);
               }
            });
                          
        //}        
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
       
      var account =Accounts.createUser(newUser);

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

    ////////BANNER METHODS BEGIN//////////

    editBanner : function (id,obj){
      return BANNER.update({_id:id}, {$set:obj});
    },  
    
    bannerChange : function (id,obj){
      return NAVBAR.update({idSitio:id}, {$set:obj});
    },
    
    ////////BANNER METHODS END//////////

    ////////NAVBAR METHODS BEGIN//////////

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
      
      var response= 'error';
      //console.log(contador);
      return SUBMENU.insert(obj, function(e,r){
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
    editSubmenu : function (id,obj){
      
      return SUBMENU.update({_id:id},{$set:obj});      
    },
    ////////NAVBAR METHODS END//////////

    ////////SIDEBAR METHODS BEGIN//////////
    insMenuEnlace : function (obj){
      var contador = MENUENLACE.find({idSitio:obj.idSitio}).count();
      var response= 'error';
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

  });

});

