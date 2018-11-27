import './reportes.html';
import {
	ReactiveVar
} from 'meteor/reactive-var';
import {
	confirmar,
	alerta
} from '/imports/alerts';
import '/imports/pickr.css';
import Pickr from '/imports/pickr.js';



//var ipLocal = new ReactiveVar();


Template.reportes.onCreated(async function helloOnCreated() {
	ipLocal = new ReactiveVar('');

});
Template.reportes.onRendered(() => {
	confirmar({
		text: 'Se eliminara el usuario'
	}, (err, res) => {
		if (res) {
			//info('Se ha borrado');
			console.log(res);
		}
		if (err) {
			alerta('No se hizo nada');
			console.log(err);
		}

	});

	//error();

	const pickr = Pickr.create({
		el: '#picker',
		default: '#42445A',
		components: {
			preview: true,
			opacity: true,
			hue: true,
			interaction: {
				hex: true,
				rgba: true,
				hsva: true,
				input: true,
				clear: true,
				save: true
			}
		},

		// User has clicked the save button
		onSave(hsva, instance) {
			// same as onChange
			if (hsva != null) {
				console.log(hsva);
				console.log(hsva.toHEX().toString());
			} else {
				console.log(hsva);
				//do stuff
			}

		}
	});
	//pickr.show();
})
Template.reportes.events({
	'click #check': function () {

		// por el momento no necesario
		/*$.getJSON("http://ip-api.com/json/?callback=?", function(data) {
        var table_body = "";
            console.log(data);
            $.each(data, function(k, v) {
                table_body += "<tr><td>" + k + "</td><td><b>" + v + "</b></td></tr>";
            });
            $("#GeoResults").html(table_body);
        });*/

		$.getJSON("https://api.ipify.org?format=jsonp&callback=?",
			function (json) {
				$("#GeoResults").html(json.ip);
			}
		);
		ipLocal.set();
		/*
    	Meteor.call('trackUser', 1, function (error, result) {	
		//console.log(result);
			Session.set('iplocal', result);		 
		});*/
		console.log(Meteor.call('trackUser'));
		$("#browser").html();

		//console.log(ipLocal.get());
		//$




		//console.log(navigator.appVersion);



	}
});