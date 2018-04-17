import './reportes.html';
import { ReactiveVar } from 'meteor/reactive-var';
//var ipLocal = new ReactiveVar();

	
Template.reportes.onCreated(async function helloOnCreated() {
  ipLocal = new ReactiveVar('');
  
});

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
	      function(json) {
	      	
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
