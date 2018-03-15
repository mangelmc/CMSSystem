import { ReactiveVar } from 'meteor/reactive-var';
import './footer.html';
import validar from '../validations.js'

var footerForm = new ReactiveVar(false)	;
Template.footeradmin.helpers({
	footer: function () {
		return FOOTER.findOne();
	},

});
Template.footeradmin.events({
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
		
	}
});

