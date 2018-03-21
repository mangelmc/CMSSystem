
import './banner.html';
import { ReactiveVar } from 'meteor/reactive-var';
import validar from '../validations.js'


var tituloForm = new ReactiveVar(true);
var stituloForm = new ReactiveVar(true);
Template.banneradmin.helpers({
	
	
	listBanner : function(){
		var id = FlowRouter.getParam('titulo');
		
		return	BANNER.find({idSitio:id});	
					
	},
	arriba: function(){
		
		if (this.posicion == 'up') {
			return true;
		}
		return false
	}
});


Template.banneradmin.events({
	'click #regform': function () {
		setFormbanner.set({temp:'Formbanner',name:'Formulario de Registro'});
	},
     'input #titulositio': function (e) {
		//console.log(e.target.value);	
		var result = validar('carrera',e.target.value,'#alerttitulo');
		if (result == false) {
			tituloForm.set(false);
		}
		else{
			tituloForm.set(true);
		}
	},
	'input #subtitulositio': function (e) {
		//console.log(e.target.value);	
		var result = validar('carrera',e.target.value,'#alertsubtitulo');
		if (result == false) {
			stituloForm.set(false);
		}
		else{
			stituloForm.set(true);
		}
	},

  'submit #formbanner': function (e) {
		e.preventDefault();
		if (tituloForm.get() == false||stituloForm.get() == false) {
			alert('Debe arreglar lo errores del formulario');
			return;
		}

		var idBanner = this._id;
		var obj = {
			titulo : e.target.titulo.value,
			subtitulo: e.target.subtitulo.value,
			posicion: e.target.posicion.value,
			//aqui falta de los archivos 
		}
     Meteor.call('editBanner', idBanner,obj, function (error, result) {
			if (result) {

				if (result == 1) {
					//console.log(result);
					sAlert.success('Se ha modificado ', {effect: 'slide',offset: '130',html:true});
				}
			}
			if (error) {
					sAlert.error(''+error, {effect: 'slide',offset: '130'/*position: 'bottom-right'*/});

			}
		});
	},


});