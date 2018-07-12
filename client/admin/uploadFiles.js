import { Template }    from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

idFile = new ReactiveVar('none');
Template.uploadFormFiles.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  idFile.set('none');
});
Template.uploadFormFiles.onRendered(function(){
  
})
Template.uploadFormFiles.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  },
  listGaleria: function(){
    return ARCHIVOS.collection.find({}).fetch();//rev
  },
  itemFile: function(){
    //console.log(ARCHIVOS.findOne({_id:this._id}));
    return ARCHIVOS.findOne({_id:this._id});
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
        meta : {
          idSitio :FlowRouter.getParam("titulo"),
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