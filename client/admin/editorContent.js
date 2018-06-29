import {Meteor} from "meteor/meteor";

import './editorContent.html';


Template.editorContent.events({
	'click #images-tab': function () {
		$('.galeriai').slideDown('fast');
	}
});