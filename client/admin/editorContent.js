import {Meteor} from "meteor/meteor";
import { ReactiveVar } from 'meteor/reactive-var';
import './editorContent.html';

var cuerpo = new ReactiveVar('');

Template.editorContent.events({
	'click #images-tab': function () {
		$('.galeriai').slideDown('fast');
	}
});
Template.editorContent.onCreated(function(){
	
	this.autorun(function () {
		cuerpo.set(CUERPO.findOne());
		if (cuerpo.get() != undefined) {
			$('.note-editable').css('background-color', cuerpo.get().fondo);
			//console.log(cuerpo.get().fondo);
		}
	});	
})
Template.editorContent.onRendered(function(){
	
		
	

	es = $('#summernote');

	es.summernote({

	  lang : 'es-ES',
	  //height : 200,
	  toolbar: [
	    ['textstyle', ['style']],
	    //['mybutton', ['hello','buton']],  
	    ['style', ['bold', 'italic', 'underline', 'clear']],
	    ['fontstyle', ['fontname','fontsize','color']],		
	    //['font', ['strikethrough', 'superscript', 'subscript']],
	    ['para', ['ul', 'ol', 'paragraph']],
	    ['height', ['height']],
	    [ 'insert', [ 'link','picture','video','table','hr'] ],
	    ['misc', ['codeview', 'undo', 'redo','help']],
	  ],
	  /*
	  buttons: {
	    hello: HelloButton,
	    buton : MyButton
	  }*/
	});
	$('div.note-group-select-from-files').remove();
	
	

});
Template.editorContent.onDestroyed(function(){
	es.summernote('destroy');
})