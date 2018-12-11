import {
  Template
} from 'meteor/templating';
import {
  ReactiveVar
} from 'meteor/reactive-var';

import './uploadImages.html';

idImagen = new ReactiveVar('none');
Template.uploadFormImages.onCreated(function () {

  idImagen.set('none');
});
Template.uploadFormImages.onRendered(function () {
  this.autorun(function () {
    if (idImagen.get() == 'none') {
      $('#currentImage').slideUp('fast');
    } else {
      $('#' + idImagen.get() + 'c').click();
    }

  })
})
Template.uploadFormImages.helpers({

  listGaleria: function () {
    //CAMBIAR PERMISOS A SITIO Y NO ASI A USER
    return IMAGES.find({});
  }
});

Template.uploadFormImages.events({
  'click .vergaleria': function () {
    $('.galeriai').slideToggle('fast');
  },
  /*'click .selimg': function (e) {
    idImagen.set(this._id);
  },*/
  'click .check': function (e) {
    var img = e.target.querySelector('img');
    if (img != null) {
      //console.log(img);


      es.summernote('focus');
      es.summernote('editor.insertImage', img.src);
    }
    $('.check i').each(function (index, el) {
      if ($(this).hasClass('fa-check-circle-o')) {
        //console.log('tiene');
        $(this).removeClass('fa-check-circle-o').addClass('fa-circle-o');
        $(this).parent().parent().removeClass().addClass('bg-secondary');
      }
    });
    $('#' + this._id + 'c i').removeClass('fa-circle-o').addClass('fa-check-circle-o');
    $('#' + this._id + 'c i').parent().parent().removeClass('bg-secondary').addClass('bg-primary');

    idImagen.set(this._id);
    $('#currentImage').slideDown();
    $('.galeria').slideUp('fast');

  },
  'change #fileInput'(e, template) {
    var file = $(e.currentTarget).get(0).files[0];
    //console.log(file);
    if (file == undefined) {
      alert('!Oops hubo un problema vuelve a intentarlo');
      return;
    }
    if (file.size > 1024 * 1024 * 5 || (file.type != "image/png" && file.type != "image/jpeg")) {
      alert('puedes subir solo imagenes validas y con un peso no mayor a 45 MBs');
      return;
    }
    handleFileSelect(file); //reemplazar por esto en produccion

  }
});

idImagenDesc = new ReactiveVar('none');

Template.uploadFormImagesDesc.onCreated(function () {

  idImagenDesc.set('none');
});
Template.uploadFormImagesDesc.onRendered(function () {
  this.autorun(function () {
    if (idImagenDesc.get() != 'none') {

      //$('#'+idImagenDesc.get()+'desc').click();
      //console.log($('#'+idImagenDesc.get()+'desc'));
      var img = $('#' + idImagenDesc.get() + 'desc').children('img').attr('src');
      //console.log(img);
      if (img == undefined) {
        //alert("error");
        return;
      }
      $('#imgdesc').attr('src', img);

      $('.checkdesc i').each(function (index, el) {
        if ($(this).hasClass('fa-check-circle-o')) {
          //console.log('tiene');
          $(this).removeClass('fa-check-circle-o').addClass('fa-circle-o');
          $(this).parent().parent().removeClass().addClass('bg-secondary');
        }
      });
      $('#' + idImagenDesc.get() + 'desc i').removeClass('fa-circle-o').addClass('fa-check-circle-o');
      $('#' + idImagenDesc.get() + 'desc i').parent().parent().removeClass('bg-secondary').addClass('bg-primary');
      $('#currentImage').slideDown();
    }

  });

})
Template.uploadFormImagesDesc.helpers({

  listGaleria: function () {
    return IMAGES.find({});
  }
});

Template.uploadFormImagesDesc.events({

  'click .checkdesc': function (e) {
    idImagenDesc.set(this._id);
    $('#imagendesc').modal('hide');
  },

  'change #fileInput'(e, template) {

    var file = $(e.currentTarget).get(0).files[0];
    //console.log(file);
    if (file == undefined) {
      alert('!Oops hubo un problema vuelve a intentarlo');
      return;
    }
    if (file.size > 1024 * 1024 * 5 || (file.type != "image/png" && file.type != "image/jpeg")) {
      alert('puedes subir solo imagenes validas y con un peso no mayor a 45 MBs');
      return;
    }

    handleFileSelect(file);
    return false;
  }
});

/*
lastModified: 1528820173343
lastModifiedDate: Tue Jun 12 2018 12:16:13 GMT-0400 (hora de Bolivia) {}
name: "flag-blue-icon.png"
size: 15295
type: "image/png"
webkitRelativePath: ""*/


class FileUpload {
  static get ChunkByteSize() {
    return 45000
  }
}

function handleFileSelect(files) {
  //for (let i = 0, f; f = files[i]; i++) {
  let f = files;
  let reader = new FileReader();
  reader.f = f;
  reader.onload = function () {
    let fileName = this.f.name;
    let fileExtention = this.f.name;
    let data = reader.result;
    let array = new Int8Array(data);
    let chunks = array.length / FileUpload.ChunkByteSize;
    datos = {
      chunks: chunks,
      fileName: fileName
    };
    parameters = {
      a: array,
      d: datos
    }
    Meteor.call('uploadFile', parameters, function (error, result) {
      console.log(error || result);
      //recupera result.url

      if (result) {
        var carrera = FlowRouter.getParam('titulo');
        let splited = files.name.split('.');
        let ext = splited[splited.length - 1];
        let splited1 = files.name.split('/');
        let name = splited1[splited1.length - 1];
        console.log(ext, name);

        var obj = {
          idSitio: carrera,
          userId: Meteor.userId(),
          originalName: name,
          ext: ext,
          url: result.url
        };
        console.log(obj);

        Meteor.call('insImagen', obj, function (error, result) {
          if (error) {
            alert('hubo un erroe al intentar guardar en la base de datos');
          }
          if (result) {
            alert('Se guardo en la base de datos  b');
          }
        });
      }


      //http://archivos.uatf.edu.bo/7f96d760-81ff-44f7-acb1-d86f38d54871.34338.svg
      //http://archivos.uatf.edu.bo/images/Comunicado6-3.png
      //http://www.uatf.edu.bo/archivos/2018/1ra.%20CONVOCATORIA%20AUXILIAR%20DE%20INVESTIGACI%C3%93N%202018.pdf
    });


    //console.log(parameters);
  };
  reader.readAsArrayBuffer(f);
  //}
}