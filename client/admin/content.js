import './content.html';
import { ReactiveVar } from 'meteor/reactive-var';
var estadoMenu = new ReactiveVar('activo');
Template.contentmenuadmin.helpers({

	listBanner : function(){
		var id = FlowRouter.getQueryParam('id');
		return	CUERPO.find({idSitio:id});	
	
	},
	estado : function(){
		if (estadoMenu.get()=='activo') {
			return {texto:'ACTIVOS'};
		}
		return {texto:'INACTIVOS'};
	},
	listMenu : function(){
		return MENU.find({estado:estadoMenu.get()});
	},
	submenu : function(){
		//console.log(this);
		if (this.tipo=='con submenu') {
			return	true;
		}
		return false;
	},
	activo : function(){
		//console.log();
		if (this.estado=='activo') {
			return	true;
		}
		return false;
	},
	listSubmenu : function(){
		//console.log(this);
		return SUBMENU.find({idMenu : this._id});
	},
	subActivo : function(){
		//console.log();
		if (this.estado=='Activo') {
			return	true;
		}
		return false;
	},

});
Template.contentmenuadmin.events({
	'click .listmenu': function (e) {
		//console.log(e.target.id);
		estadoMenu.set(e.target.id);
	},
	'click .editarc': function () {
		
		var carrera = FlowRouter.getParam('titulo');
		FlowRouter.go('/admin/:titulo/:idcont',{titulo:carrera,idcont:this._id});
		
	},
	'change #tipofondo': function (e) {
		var tipo = e.target.value;
		if (tipo == 'color') {
			$('#imgfondo').slideUp('slow', function() {
				$('#colorfondo').slideDown('slow');
			});	
		}
		if (tipo == 'imagen') {
			$('#colorfondo').slideUp('slow', function() {
				$('#imgfondo').slideDown('slow');
			});	
		}
	}
});
Template.editarcont.onRendered(function(){
	console.log('rendered');
	
		$('#summernote').summernote();
});
Template.editarcont.onDestroyed(function(){
	$('#summernote').summernote('destroy');
})