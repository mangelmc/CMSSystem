import	'./usuarios.html';

import { ReactiveVar } from 'meteor/reactive-var';

Template.usuarios.helpers({
	listUsers: function () {
		return	Accounts.users.find({});
	},
	registro : function(){
		var fecha = this.createdAt;
        //console.log(fecha);
        if (fecha != undefined)  {
	        var options ={
	            weekday:'long',year:'numeric',month:'long',day:'numeric'
	        }

	        fecha = fecha.toLocaleDateString('es-ES',options);
	        return fecha;
	    }
	}
});

