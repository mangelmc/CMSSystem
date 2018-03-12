import './banner.html';
import { ReactiveVar } from 'meteor/reactive-var';


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
Template.banneradmin.events({
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