import { Template }    from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

idFile = new ReactiveVar('none');
Template.uploadFormFiles.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  idFile.set('none');
});
Template.uploadFormFiles.onRendered(function(){
  /*this.autorun(function(){
    if (idFile.get() == 'none') {
      $('#currentImage').slideUp('fast');
    }else{
      $('#'+idFile.get()+'c').click();
    }
    
  })*/
})
Template.uploadFormFiles.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  },
  listGaleria: function(){
    return ARCHIVOS.collection.find({userId:Meteor.userId()}).fetch();//rev
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
  /*'click .selimg': function (e) {
    idFile.set(this._id);
  },*/
  'click .checkf': function (e) {
    var img = e.target.querySelector('img');
    if ( img!= null) {
      //console.log(img.src);
    

      es.summernote('focus');
      es.summernote('editor.insertImage', img.src);
    }
    $('.check i').each(function(index, el) {
        if ($(this).hasClass('fa-check-circle-o')) {
          //console.log('tiene');
          $(this).removeClass('fa-check-circle-o').addClass('fa-circle-o');
          $(this).parent().parent().removeClass().addClass('bg-secondary');
        }
    });
    $('#'+this._id+'c i').removeClass('fa-circle-o').addClass('fa-check-circle-o');
    $('#'+this._id+'c i').parent().parent().removeClass('bg-secondary').addClass('bg-primary');
    
    idFile.set(this._id);
    $('#currentImage').slideDown();
    $('.galeria').slideUp('fast');

  },
  'change #fileInput'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = ARCHIVOS.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('error al subir el Archivo: ' + error);
        } else {
          idFile.set(fileObj._id);
          //console.log(idFile);
          alert('El archivo "' + fileObj.name + '" Se ha subido correctamente');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});