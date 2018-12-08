import {
  Meteor
} from 'meteor/meteor';
import './methods.js';
import './publications.js';
Meteor.startup(() => {
  // code to run on server at startup
  CONTENIDO.rawCollection().createIndex({
    titulo: "text",
    descripcion: "text",
    contenidoHtml: "text",
  })

  HTTP_FORWARDED_COUNT = 1;
});