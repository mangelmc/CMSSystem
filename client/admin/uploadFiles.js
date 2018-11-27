import {
  Template
} from 'meteor/templating';
import {
  ReactiveVar
} from 'meteor/reactive-var';

idFile = new ReactiveVar('none');
Template.uploadFormFiles.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  idFile.set('none');
});
Template.uploadFormFiles.onRendered(function () {

})
Template.uploadFormFiles.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  },
  listGaleria: function () {
    return ARCHIVOS.collection.find({}).fetch(); //rev
  },
  itemFile: function () {
    //console.log(ARCHIVOS.findOne({_id:this._id}));
    return ARCHIVOS.findOne({
      _id: this._id
    });
  }
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
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = ARCHIVOS.insert({
        file: e.currentTarget.files[0],
        meta: {
          idSitio: FlowRouter.getParam("titulo"),
        },
        streams: 'dynamic',
        chunkSize: 'dynamic',
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('error al subir el Archivo: ' + error);
        } else {
          idFile.set(fileObj._id);
          //console.log(idFile);aca umentamos e id para los sitios
          alert('El archivo "' + fileObj.name + '" Se ha subido correctamente');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
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


    /*Meteor.call('loginFileServer', function (error, result) {
      if (error) {
        alert(error);
      }else{
        Meteor.call('uploadFiles',parameters,result, function (error, result) {
          console.log(error || result);
          //recupera result.url
          //http://archivos.uatf.edu.bo/7f96d760-81ff-44f7-acb1-d86f38d54871.34338.svg
        });
      }
    });*/

    //console.log(parameters);
  };
  reader.readAsArrayBuffer(f);
  //}
}
Template.uploadExterno.events({
  'change #fileInput': function (e) {

    var file = $('#fileInput').get(0).files[0];
    console.log(file);
    if (true) {
      console.log(e.currentTarget.files[0]);
    }
    handleFileSelect(file);
    //console.log(e.currentTarget.files[0]);
    return false;
  },
  'click #loginserver': function (e) {
    console.log('click');
  }

});