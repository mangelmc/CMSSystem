import { ReactiveVar } from 'meteor/reactive-var';
import './footer.html';
import validar from '../validations.js'

var footerForm = new ReactiveVar(false)	;
Template.footeradmin.helpers({
	footer: function () {
		return FOOTER.findOne();
	},
	footerDefault : function(){
		var footer = FOOTER.findOne({});
		//console.log(tipo);
		if (footer != undefined && footer.tipo == "default") {
			$('#tipofooter option[value="'+footer.tipo+'"]').prop('selected', true);
			return true;
		}
		$('#tipofooter option[value="personalizado"]').prop('selected', true);
		return false;
	}

});
Template.footeradmin.events({
	'change #tipofooter': function (e) {
		var id = FlowRouter.getParam("titulo");
		var obj = {
			tipo : e.target.value,
		}
		//console.log(obj);
		Meteor.call('footerChange', id,obj, function (error, result) {
			sAlert.info('Se modifico ', {effect: 'slide',offset: '130'});
			//console.log(result);
		});
	},


	'input #footer': function (e) {
		//console.log(e.target.value);	
		var result = validar('carrera',e.target.value,'#alertfooter');
		if (result == false) {
			footerForm.set(false);
		}
		else{
			footerForm.set(true);
		}
	},
	'submit #formedit': function (e) {
		e.preventDefault();
		if (footerForm.get() == false) {
			alert('Debe solucionar los errores del formulario');
			return;
		}
		var texto = e.target.texto.value;
		var idFooter = e.target.idfooter.value;
		Meteor.call('editFooter', texto,idFooter, function (error, result) {
			if (result) {				
					sAlert.success('Se ha modificado ', {effect: 'slide',offset: '130',html:true});
			}

		});
		
	},
	'submit #formeditfooterhtml': function (e) {
		e.preventDefault();
		var obj = {
			html : e.target.texto.value
		}
		var idSitio = FlowRouter.getParam('titulo');
		Meteor.call('editFooterHtml', idSitio,obj, function (error, result) {
			if (result) {				
					sAlert.success('Se ha modificado', {effect: 'slide',offset: '130',html:true});
			}

		});
		
	}
});

