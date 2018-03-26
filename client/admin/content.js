import './content.html';
import { ReactiveVar } from 'meteor/reactive-var';

Template.contentadmin.helpers({

	listBanner : function(){
		var id = FlowRouter.getQueryParam('id');
		return	CUERPO.find({idSitio:id});	
	
	}

});
Template.contentadmin.events({
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