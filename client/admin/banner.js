import './banner.html';
import { ReactiveVar } from 'meteor/reactive-var';
import validar from '../validations.js'

var loadTipo = new ReactiveVar();


Template.banneradmin.events({
	'change #tipo': function (e) {
		var id = FlowRouter.getParam("titulo");
		var obj = {
			tipo : e.target.value,
		}
		//console.log(obj);
		Meteor.call('bannerChange', id,obj, function (error, result) {
			sAlert.info('Se modifico', {effect: 'slide',offset: '130'});
			//console.log(result);
		});
	},
	'submit #formeditbanner': function (e) {
		e.preventDefault();
		idBanner = BANNER.findOne({})._id;
		obj = {
			texto : e.target.texto.value,
			imagen : e.target.link.value
		}
		Meteor.call('editBanner',idBanner, obj, function (error, result) {
			sAlert.info('Se modifico', {effect: 'slide',offset: '130'});
		});

		//console.log(obj);
	},
	'submit #formeditbannerhtml': function (e) {
		e.preventDefault();
		idBanner = BANNER.findOne({})._id;
		var html = e.target.texto.value;
		//console.log(idBanner);
		Meteor.call('editBannerHtml',idBanner, html, function (error, result) {
			//console.log(result);
			sAlert.info('Se modifico', {effect: 'slide',offset: '130'});
		});
		
	},
	'click .mostrarcont': function () {
		
		$('#contforcarrusel').slideToggle('slow');
	},
	'click .cerrarcont': function () {
		$('#contforcarrusel').slideUp('slow');
	},
	'submit #formcarrusel': function (e) {
		e.preventDefault();
		var obj ={
			idSitio : FlowRouter.getParam('titulo'),
			titulo : e.target.titulo.value,
			texto : e.target.texto.value,
			imagen : e.target.imagen.value,
			link : e.target.link.value,
		}
		Meteor.call('insertCarrusel', obj, function (error, result) {
			sAlert.success(result, {effect: 'slide',offset: '130'});
		});
	},
	'click .editcarrusel': function () {
		FlowRouter.go('/admin/:titulo/banner/editcarrusel/:id',{titulo:FlowRouter.getParam('titulo'),id:this._id})
	}
});
Template.banneradmin.helpers({
	tipoBanner : function(){
		var id = FlowRouter.getParam('titulo');
		var tipo = '';
		if (BANNER.findOne({idSitio:id})!=undefined) {
			tipo = BANNER.findOne({idSitio:id});			
			$('#tipo option[value="'+tipo.tipo+'"]').prop('selected', true);
			// cargar el tipo
			//alert('load');
		}
		//console.log(tipo.tipo);
		if (tipo.tipo == 'texto e imagen') {
			return {texto:'texto e imagen'};
		}
		if (tipo.tipo == 'carrusel') {
			return {carrusel : 'carrusel'};
		}
		if (tipo.tipo == 'personalizado') {
			return {personal : 'personalizado'};
		}			
		
	},
	listItemsCarrusel : function(){
		return CARROUSEL.find();
	},
	banner : function(){
		return BANNER.findOne();
	},
});
Template.editcarrusel.helpers({
	carrusel: function () {
		return CARROUSEL.findOne({_id:FlowRouter.getParam('id')});
	}
});
Template.editcarrusel.events({
	'click #cancelaredit': function () {
		FlowRouter.go('/admin/:titulo/banner',{titulo:FlowRouter.getParam('titulo')},1);
	},
	'submit #formeditcarrusel': function (e) {
		e.preventDefault();
		var idSitio = FlowRouter.getParam('titulo');
		var id = FlowRouter.getParam('id');
		var obj = {
			titulo : e.target.titulo.value,
			texto : e.target.texto.value,
			imagen : e.target.imagen.value,
			link : e.target.link.value,
		}
		Meteor.call('editCarrusel', id, obj, function (error, result) {
			sAlert.info('Se modifico', {effect: 'slide',offset: '130'});
		});
		FlowRouter.go('/admin/:titulo/banner',{titulo : idSitio});
	}
});
