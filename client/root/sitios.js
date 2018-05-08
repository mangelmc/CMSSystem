
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

var userForm = new ReactiveVar(false);
var passForm = new ReactiveVar(false);
var emailForm = new ReactiveVar(false);
var nameForm = new ReactiveVar(false);
var surnameForm = new ReactiveVar(false);
var careerForm = new ReactiveVar(false);
Template.sitios.helpers({
    listUsers : function(){
        return Meteor.users.find({_id:{$ne:Meteor.userId()},roles : ["admin"]});
    },
   
    existListUsers : function(){
    	var firstUser = Meteor.users.findOne({roles:["admin"]});	
    	//console.log(Meteor.users.findOne({roles:["admin"]}));
    	if (firstUser!=undefined && firstUser.roles != undefined && firstUser.roles[0] =='admin' ) {
    		formSitio.admin.set(true);
    		return true;
    	}
    	//console.log(formSitio.admin.get());
    	formSitio.admin.set(false);
    	return false;
    }
    

});
Template.sitioslist.helpers({
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
    	var firstUser = Meteor.users.findOne({roles:["admin"]});	
    	//console.log(Meteor.users.findOne({roles:["admin"]}));
    	if (firstUser!=undefined && firstUser.roles != undefined && firstUser.roles[0] =='admin' ) {
    		formSitio.admin.set(true);
    		return true;
    	}
    	//console.log(formSitio.admin.get());
    	formSitio.admin.set(false);
    	return false;
    }
    

});

///

Template.sitios.events({
	'input #carrera': function (e) {
		
		var link = e.target.value.trim().split(" ").join("-");
		var result = validar('carrera',e.target.value,'#alertcarrera');
		
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
		var result = validar('dominio',e.target.value,'#alerttitulo');
		
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
	//Crear sitio form
	'submit #formsitio' : function (e) {
		e.preventDefault();
		//console.log(e);
		if (formSitio.carrera.get() == false || formSitio.titulo.get() == false ||formSitio.admin.get() == false  ) {
			alert('arregla los errores');
			console.log(formSitio);
			return;
		}

		var titulo = e.target.titulo.value.trim().split(" ").join("-");
		/*Meteor.call('checkSitio', titulo, function (error, result) {
			if (result == false) {
				
				console.log('error');
				return;
			}

		});*/
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
				sAlert.success(result, {effect: 'slide',offset: '130'});
			}
			if (error) {
				sAlert.error(error, {effect: 'slide',offset: '130'});
			}
		});
		$('#formsitio')[0].reset();
		FlowRouter.go('/root');
		//alert('termino');
	},
	
	'input #username': function (e) {
		//console.log(e.target.value);	
		var result = validar('usuario',e.target.value,'#alertusername');
		if (result == false) {
			userForm.set(false);
		}
		else{
			userForm.set(true);
		}
	},
	'input #password': function (e) {
		//console.log(e.target.value);	
		var result = validar('password',e.target.value,'#alertpassword');
		if (result == false) {
			passForm.set(false);
		}
		else{
			passForm.set(true);
		}
	},
	'input #repassword': function (e) {
		//console.log(e.target.value);	
		var result = validar('password',e.target.value,'#alertrepassword');
		if (result == false) {
			passForm.set(false);
		}
		else{
			passForm.set(true);
		}
	},
	'input #email': function (e) {
		//console.log(e.target.value);	
		var result = validar('email',e.target.value,'#alertemail');
		if (result == false) {
			emailForm.set(false);
		}
		else{
			emailForm.set(true);
		}
	},
	'input #name': function (e) {
		//console.log(e.target.value);	
		var result = validar('nombre',e.target.value,'#alertname');
		if (result == false) {
			nameForm.set(false);
		}
		else{
			nameForm.set(true);
		}
	},
	'input #surname': function (e) {
		
		var result = validar('nombre',e.target.value,'#alertsurname');

		if (result == false) {
			surnameForm.set(false);
		}
		else{
			surnameForm.set(true);
		}
	},
	'input #carrerae': function (e) {
		//console.log(e.target.value);	
		var result = validar('carrera',e.target.value,'#alertcarrerae');
		if (result == false) {
			careerForm.set(false);
		}
		else{
			careerForm.set(true);
		}
	},
	'submit #regAdminForm': function (e) {
		e.preventDefault();
		


		
		if (userForm.get() == false || emailForm.get() == false || nameForm.get() == false ||surnameForm.get() == false || careerForm.get() == false ||passForm.get() == false) {
			alert('Debe Arreglar los errores del Formulario');
			return;
		}
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
	}
});
Template.sitioslist.events({
	'click .listsitios': function (e) {
		estado.set(e.target.id);
		//console.log(e.target.value);
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
				sAlert.success('Administrador modificado', {effect: 'slide',offset: '130'});
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
		FlowRouter.go('/admin/:titulo',{titulo:this._id},1);
		
	},
	'click .visitar': function () {
		//console.log(this.titulo);
		FlowRouter.go('/:titulo',{titulo:this.titulo},1);
		
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