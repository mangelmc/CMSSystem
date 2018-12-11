import './header.html';
import {
	ReactiveVar
} from 'meteor/reactive-var';
import validar from '../validations.js'


var tituloForm = new ReactiveVar(true);
var stituloForm = new ReactiveVar(true);
Template.headeradmin.helpers({


	listHeader: function () {
		var id = FlowRouter.getParam('titulo');

		return HEADER.find({
			idSitio: id
		});

	},
	arriba: function () {

		if (this.posicion == 'up') {
			return true;
		}
		return false
	}
});


Template.headeradmin.events({

	'input #titulositio': function (e) {
		//console.log(e.target.value);	
		var result = validar('carrera', e.target.value, '#alerttitulo');
		if (result == false) {
			tituloForm.set(false);
		} else {
			tituloForm.set(true);
		}
	},
	'input #subtitulositio': function (e) {
		//console.log(e.target.value);	
		var result = validar('carrera', e.target.value, '#alertsubtitulo');
		if (result == false) {
			stituloForm.set(false);
		} else {
			stituloForm.set(true);
		}
	},

	'submit #formheader': function (e) {
		e.preventDefault();
		if (tituloForm.get() == false || stituloForm.get() == false) {
			alert('Debe arreglar lo errores del formulario');
			return;
		}

		var idHeader = this._id;
		var obj = {
			titulo: e.target.titulo.value,
			subtitulo: e.target.subtitulo.value,
			posicion: e.target.posicion.value,
		}
		Meteor.call('editHeader', idHeader, obj, function (error, result) {
			if (result) {
				if (result == 1) {
					sAlert.success('Se ha modificado ', {
						effect: 'slide',
						offset: '130',
						html: true
					});

				}
			}
			if (error) {
				sAlert.error('' + error, {
					effect: 'slide',
					offset: '130'
				});
			}
		});
	},


});