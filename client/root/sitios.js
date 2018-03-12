import { ReactiveVar } from 'meteor/reactive-var';
import './sitios.html';
import validar from '../validations.js';
/*Tracker.autorun(function () {
	console.log('algo');
});
Meteor.startup(function(){
	$.getScript('../validations.js');
	console.log('okey');
});
Template.sitios.onCreated(function(){
	this.autorun(()=>{
		console.log('autorun')
	});
})
*/
var estado = new ReactiveVar('Activo');//filtro de lista de sitios
var formSitio = {};
formSitio.carrera = new ReactiveVar(false);
formSitio.titulo = new ReactiveVar(true);
formSitio.admin = new ReactiveVar(false); //controla q los campos sean los corectos

Template.sitios.helpers({
    readySitios : function(){

        return FlowRouter.subsReady("getSitios");

    },

    listSitios : function(){
        return SITIO.find({estado:estado.get()});
    },
    listUsers : function(){
        return Meteor.users.find({_id:{$ne:Meteor.userId()},roles : ["admin"]});
    },
    estado : function(){
    	if (estado.get()=='Activo') {
    		return 'ACTIVOS';
    	}
    	return	'INACTIVOS';
    },
    existListUsers : function(){
    	var firstUser = Meteor.users.findOne({_id:{$ne:Meteor.userId()}});	
    	if (firstUser!=undefined && firstUser.roles != undefined && firstUser.roles[0] =='admin' ) {
    		formSitio.admin.set(true);
    		return true;
    	}
    	console.log(formSitio.admin.get());
    	formSitio.admin.set(false);
    	return false;
    }
    

});

///

Template.sitios.events({
	'input #carrera': function (e) {
		
		var link = e.target.value.trim().split(" ").join("-");
		var result = validar('nombre',e.target.value,'#alertcarrera');
		
		//console.log(result);
		if (result==false) {
			formSitio.carrera.set(false);
			//sAlert.success('Your message', {effect: 'slide'});	
			return;
		}else {
			formSitio.carrera.set(true);
		}

		$('#titulo').val(link.toLowerCase());
		$('#link').val('htttp://uatf.edu.bo/'+link.toLowerCase());
		
	},
	'input #titulo': function (e) {
		//validarTitulo();
		//console.log('tiiiii');
		var result = validar('titulo',e.target.value,'#alerttitulo');
		
			//$('#titulo').val(e.target.value.slice(0,-1));
		if (result==false) {
			formSitio.titulo.set(false);
			
			return;
		}else {
			formSitio.titulo.set(true);
		}
		$('#titulo').val(e.target.value.toLowerCase());
		$('#link').val('htttp://uatf.edu.bo/'+e.target.value.toLowerCase());
	},

	'submit #formsitio' : function (e) {
		e.preventDefault();
		//console.log(e);
		if (formSitio.carrera.get() == false || formSitio.titulo.get() == false ||formSitio.admin.get() == false  ) {
			alert('arregla los errores');
			console.log(formSitio);
			return;
		}
		var titulo = e.target.titulo.value.trim().split(" ").join("-");
		
		//var cadena = "hello world!";
		
		//console.log(titulo);

		var obj = {
			titulo : titulo,
			carrera : e.target.carrera.value,
			estado : e.target.estado.value,
			admin : e.target.admin.value
		}
		Meteor.call('insertSitio', obj, function (error, result) {
			if (result) {
				console.log('se envio');
			}
			if (error) {
				console.log('error : '+error);
			}
		});
		$('#formsitio')[0].reset();
		//alert('termino');
	},
	'click .listsitios': function (e) {
		estado.set(e.target.id);
		//console.log(e.target.value);
	},
	'submit #regAdminForm': function (e) {
		e.preventDefault();
		if (e.target.password.value!=e.target.repassword.value) {
			alert('Las contraseñas no coinciden');
			return false;
		}
	 	var user = {
			username : e.target.username.value,
			email : e.target.email.value,
			password : e.target.password.value,			
			name : e.target.name.value,
			surname : e.target.surname.value,
			carrera : e.target.carrerae.value,
				
		};
		 Meteor.call('crearAdmin', user, function (error, result) {
			
			if (error) {
				
				alert(error.reason);
				return false;
			}
			if (result) {
				//res.set(result);
				$('#selectadmin option').each(function() {
					if($(this).val()==result){
						$(this).attr('selected', 'true');
					}					
				});
				//console.log(result);
				$('#regAdminForm')[0].reset();
			}			
		});
		$('#regnew').modal('hide');
	},
	'change #useradmin': function (e) {
		var useradmin = Accounts.users.findOne({_id:e.target.value});
		//console.log(e);		
		$('#nameadmin').val(useradmin.profile.name);
		$('#surnameadmin').val(useradmin.profile.surname);		
	},
	'submit #changeadminform': function (e) {
		e.preventDefault();
		var sitio = {
			_id : e.target.idsitio.value,
			carrera : e.target.sitiochange.value,
		};
		var set = {
			admin:e.target.useradmin.value
		};
		//console.log(set)
		//console.log(sitio)
		Meteor.call('changeAdmin', sitio, set, function (error, result) {
			if (result) {
				console.log(result);
			}
		});
		$('#changeadmin').modal('hide');
	}
});
Template.sitio.helpers({
	Activo: function () {
		var estado = this.estado;
		if (estado=='Activo') {
			return	true;
		}
		return	false;
	},
    fecha : function(){
    	var fecha = this.creado;
        var options ={
            weekday:'long',year:'numeric',month:'long',day:'numeric'
        }
        fecha = fecha.toLocaleDateString('es-ES',options);
        return fecha;
    },
    useradmin : function(){
    	var useradmin = Accounts.users.findOne({_id:this.admin});
    	if (useradmin!=undefined) {
    		return useradmin.username;
    	}
    	return this.admin;
    }

});
Template.sitio.events({
	'click .darbaja': function () {
		Meteor.call('darEstado', this._id,'Inactivo', function (error, result) {});//poner confirm
		//console.log('end')
	},
	'click .administrar': function () {
		//console.log(this.titulo);
		FlowRouter.go('/admin/:titulo',{titulo:this.titulo},{id:this._id});
		
	},
	'click .daralta': function () {
		Meteor.call('darEstado', this._id,'Activo', function (error, result) {});//poner confirm	
	},
	'click .changeadmin': function () {
		//console.log(this)
		$('#sitiochange').val(this.carrera);
		$('#idsitio').val(this._id);
		$('#useradmin option[value="'+this.admin+'"]').prop('selected', true);
		var useradmin = Accounts.users.findOne({_id:this.admin});
		//console.log(useradmin)
		$('#nameadmin').val(useradmin.profile.name);
		$('#surnameadmin').val(useradmin.profile.surname);

		$('#changeadmin').modal('show');
	}

});