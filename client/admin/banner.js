import './banner.html';
import {
	ReactiveVar
} from 'meteor/reactive-var';
import {
	BANNER
} from '../../collections/cmscollections';
import validar from '../validations.js'

var loadTipo = new ReactiveVar();

Template.banneradmin.onRendered(function () {
	this.autorun(function () {
		if (BANNER.findOne() != undefined) {
			var banner = BANNER.findOne();
			//console.log(banner.textoPersonalizado);

			setTimeout(function () {
				$('input[value="' + banner.textoShow + '"]').prop('checked', true);
				if (banner.tipo == 'personalizado') {
					es.summernote('code', banner.textoPersonalizado);
				}
			}, 500);
		}

	});
})
Template.banneradmin.events({
	'change #tipo'(e) {
		var id = FlowRouter.getParam("titulo");
		var obj = {
			tipo: e.target.value,
		}
		Meteor.call('bannerChange', id, obj, function (error, result) {
			sAlert.info('Se modifico el tipo de Banner', {
				effect: 'slide',
				offset: '130'
			});
		});
	},
	'submit #formeditbanner'(e) {
		e.preventDefault();

		if ($('#imgdesc').attr('src') == undefined) {
			alert('Debe seleccionar una imagen descriptiva');
			return;
		}
		idBanner = BANNER.findOne({})._id;
		obj = {
			texto: e.target.texto.value,
			imagen: $('#imgdesc').attr('src'),
			textoShow: e.target.show.value,
		}
		Meteor.call('editBanner', idBanner, obj, function (error, result) {
			sAlert.info('Se modificó', {
				effect: 'slide',
				offset: '130'
			});
		});
	},

	'submit #formeditbannerhtml'(e) {
		e.preventDefault();
		idBanner = BANNER.findOne({})._id;
		var html = es.summernote('code');
		Meteor.call('editBannerHtml', idBanner, html, function (error, result) {
			if (result) {
				sAlert.info('Se modifico el Banner personalizado', {
					effect: 'slide',
					offset: '130'
				});
			}
		});
	},
	'click .mostrarcont'() {

		$('#contforcarrusel').slideToggle('slow');
	},
	'click .cerrarcont'() {
		$('#contforcarrusel').slideUp('slow');
	},
	'submit #formcarrusel'(e) {
		e.preventDefault();
		if ($('#imgdesc').attr('src') == undefined) {
			alert('Debe seleccionar una imagen descriptiva');
			return;
		}
		var obj = {
			idSitio: FlowRouter.getParam('titulo'),
			titulo: e.target.titulo.value,
			texto: e.target.texto.value,
			imagen: $('#imgdesc').attr('src'),
			link: e.target.link.value,
		}
		Meteor.call('insertCarrusel', obj, function (error, result) {
			if (result) {
				sAlert.success("Se agregó un nuevo item carrousel", {
					effect: 'slide',
					offset: '130'
				});
			}
		});
		$('.cerrarcont').click();
		$('#formcarrusel')[0].reset();

	},
	'click .editcarrusel'() {
		FlowRouter.go('/admin/:titulo/banner/editcarrusel/:id', {
			titulo: FlowRouter.getParam('titulo'),
			id: this._id
		})
	},
	'click .elicarrusel'() {
		let count = CARROUSEL.find().count();
		if (count < 3) {
			alert("Ya no se pueden borrar mas items \n Minimo 2....!");
			return;
		}

		let res = confirm("esta seguro de borrar el item .?");
		if (res) {
			Meteor.call('eliCarrusel', this._id, function (error, result) {
				if (result) {
					sAlert.success("Se elimino el carrousel", {
						effect: 'slide',
						offset: '130'
					});
				}
			});
		}



	}
});
Template.banneradmin.helpers({
	tipoBanner() {
		var id = FlowRouter.getParam('titulo');
		var tipo = '';
		if (BANNER.findOne({
				idSitio: id
			}) != undefined) {
			tipo = BANNER.findOne({
				idSitio: id
			});
			$('#tipo option[value="' + tipo.tipo + '"]').prop('selected', true);
			// cargar el tipo
			//alert('load');
		}
		//console.log(tipo.tipo);
		if (tipo.tipo == 'personalizado') {
			return {
				personal: 'personalizado'
			};
		}
		if (tipo.tipo == 'texto e imagen') {
			return {
				texto: 'texto e imagen'
			};
		}
		if (tipo.tipo == 'carrusel') {
			return {
				carrusel: 'carrusel'
			};
		}


	},
	listItemsCarrusel() {
		return CARROUSEL.find();
	},
	banner() {
		return BANNER.findOne();
	},
});

Template.editcarrusel.helpers({
	carrusel() {
		return CARROUSEL.findOne({
			_id: FlowRouter.getParam('id')
		});
	}
});

Template.editcarrusel.events({
	'click #cancelaredit'() {
		FlowRouter.go('/admin/:titulo/banner', {
			titulo: FlowRouter.getParam('titulo')
		}, 1);
	},
	'submit #formeditcarrusel'(e) {
		e.preventDefault();
		if ($('#imgdesc').attr('src') == undefined) {
			alert('Debe seleccionar una imagen descriptiva');
			return;
		}

		var idSitio = FlowRouter.getParam('titulo');
		var id = FlowRouter.getParam('id');
		var obj = {
			titulo: e.target.titulo.value,
			texto: e.target.texto.value,
			imagen: $('#imgdesc').attr('src'),
			link: e.target.link.value,
		}
		Meteor.call('editCarrusel', id, obj, function (error, result) {
			sAlert.info('Se modifico', {
				effect: 'slide',
				offset: '130'
			});
		});
		FlowRouter.go('/admin/:titulo/banner', {
			titulo: idSitio
		});
	}
});