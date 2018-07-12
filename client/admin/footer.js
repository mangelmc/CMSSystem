import { ReactiveVar } from 'meteor/reactive-var';
import './footer.html';
import validar from '../validations.js'

var footerForm = new ReactiveVar(false)	;
var footerLinkForm = new ReactiveVar(false);
var footerLinkEditForm = new ReactiveVar(true);
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
	},
	listLinks :  function () {
		return FOOTERLINKS.find();
	},

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
		
	},
	'input #link': function (e) {
		//console.log(e.target.value);	
		var result = validar('url',e.target.value,'#alertlink');
		if (result == false) {
			footerLinkForm.set(false);
		}
		else{
			footerLinkForm.set(true);
		}
	},
	'click .link .dropdown-item': function (e,template) {
		var ic = $(e.currentTarget).children('i').attr('class');
		//console.log(ic);
		$('#currentIcon').removeClass().addClass(ic).removeClass('float-right');
	},
	'submit #formenlace': function (e) {
		e.preventDefault();
		if (footerLinkForm.get() == false) {
			alert('Debe arreglar los erore en le formulario');
			return;
		}
		var obj = {
			idSitio : FlowRouter.getParam('titulo'),
			icono : $('#currentIcon').attr('class'),
			link : e.target.link.value
		}
		Meteor.call('insLinkFooter', obj, function (error, result) {
			if (result != 'error') {
				sAlert.success('Se ha insertado un nuevo link', {effect: 'slide',offset: '130',html:true});
			}
		});
		e.target.link.value = '';
	},
	'click .elilink': function () {
		var res = confirm('Esta seguro de eliminar el Enlace ? ');
		if (res) {
			Meteor.call('eliLinkFooter', this._id, function (error, result) {
				if (result == 1) {
						
				sAlert.info('Se ha eliminado el Enlace', {effect: 'slide',offset: '130',html:true});
				}
			});
		}
	},
	'click .editlink': function () {
		$('#idlinkedit').val(this._id);
		$('#linkedit').val(this.link);
		$('#currentIconEdit').addClass(this.icono);

		$('#linkModalEdit').modal('show');
	},
	'input #linkedit': function (e) {
		//console.log(e.target.value);	
		var result = validar('url',e.target.value,'#alertlinkedit');
		if (result == false) {
			footerLinkEditForm.set(false);
		}
		else{
			footerLinkEditForm.set(true);
		}
	},
	'click .linkedit .dropdown-item': function (e,template) {
		var ic = $(e.currentTarget).children('i').attr('class');
		//console.log(ic);
		$('#currentIconEdit').removeClass().addClass(ic).removeClass('float-right');
	},
	
	'submit #editlinkfooter': function (e) {
		e.preventDefault();
		if (footerLinkEditForm.get() == false) {
			alert('Debe arreglar los erore en le formulario');
			return;
		}
		var idLink = e.target.idlink.value;
		var obj = {
			
			icono : $('#currentIconEdit').attr('class'),
			link : e.target.linkedit.value
		}
		Meteor.call('editLinkFooter',idLink, obj, function (error, result) {
			if (result == 1) {
				sAlert.info('Se ha modificado el Enlace', {effect: 'slide',offset: '130',html:true});
			}
		});
		$('#linkModalEdit').modal('hide');
	},
});

