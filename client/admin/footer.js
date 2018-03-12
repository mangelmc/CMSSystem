
import { ReactiveVar } from 'meteor/reactive-var';
import './footer.html';

Template.footeradmin.helpers({
	footer: function () {
		return FOOTER.findOne();
	},

});
Template.footeradmin.events({
	'submit #formedit': function (e) {
		e.preventDefault();
		var texto = e.target.texto.value;
		var idFooter = e.target.idfooter.value;
		Meteor.call('editFooter', texto,idFooter, function (error, result) {


		});
		
	}
});

