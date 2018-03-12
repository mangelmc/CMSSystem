
import './banner.html';
import { ReactiveVar } from 'meteor/reactive-var';
import validar from '../validations.js'

Template.banneradmin.helpers({
	
	
	listBanner : function(){
		var id = FlowRouter.getQueryParam('id');
		return	BANNER.find({idSitio:id});	
					
	},
	arriba: function(){
		
		if (this.posicion == 'up') {
			return true;
		}
		return false
	}
});
var regFormbanner = new ReactiveVar(false);
Template.banneradmin.events({
	'click #regform': function () {
		setFormbanner.set({temp:'Formbanner',name:'Formulario de Registro'});
	},
     'input #titulo': function (e) {
		//console.log(e.target.value);	
		var result = validar('titulositio',e.target.value,'#alerttitulo');
		if (result == false) {
			regForm.set(false);
		}
		else{
			regForm.set(true);
		}
	},
	'input #subtitulo': function (e) {
		//console.log(e.target.value);	
		var result = validar('subtitulositio',e.target.value,'#alertsubtitulo');
		if (result == false) {
			regForm.set(false);
		}
		else{
			regForm.set(true);
		}
	},

  'submit #formbanner': function (e) {
		e.preventDefault();
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