import {
  Template
} from 'meteor/templating';
import {
  ReactiveVar
} from 'meteor/reactive-var';

idFile = new ReactiveVar('none');
Template.uploadFormFiles.onCreated(function () {

  idFile.set('none');
});

Template.uploadFormFiles.helpers({

  listGaleria() {
    return ARCHIVOS.find({}); //rev
  },

});

Template.uploadFormFiles.events({
  'click .vergaleria': function () {
    $('.galeria').slideToggle('fast');
  },

  'click .checkfile': function (e) {
    var src = $(e.currentTarget).siblings("a").attr('href');
    var name = $(e.currentTarget).parent().siblings("span").text();
    //console.log(src);

    es.summernote('focus');
    es.summernote('createLink', {
      text: name,
      url: src,
      isNewWindow: true
    });
    idFile.set(this._id);
    $('.galeria').slideUp('fast');

  },
  'change #fileInput'(e, template) {
    var file = $(e.currentTarget).get(0).files[0];
    //console.log(file);
    if (file == undefined) {
      alert('!Oops hubo un problema vuelve a intentarlo');
      return;
    }
    /*let split = file.name.split(".");
    let regexp = new RegExp("js", "i");
    let res = regexp.test(split[split.length - 1]);*/
    if (file.size > 1024 * 1024 * 45) {
      alert('Puedes subir archivos con un peso no mayor a 45 MBs');
      return;
    }
    handleFileSelect(file); //reemplazar por esto en produccion
    return false;
  }
});


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

        Meteor.call('insArchivo', obj, function (error, result) {
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