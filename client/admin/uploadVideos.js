import { Template }    from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

idVideo = new ReactiveVar('none');
Template.uploadFormVideos.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  idVideo.set('none');
});
Template.uploadFormVideos.onRendered(function(){
  /*this.autorun(function(){
    if (idImagen.get() == 'none') {
      $('#currentImage').slideUp('fast');
    }else{
      $('#'+idImagen.get()+'c').click();
    }
    
  })*/
})
Template.uploadFormVideos.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  },
  listGaleria: function(){
    return VIDEOS.collection.find({userId:Meteor.userId()});
  },
  itemVideo: function(){
    //console.log(IMAGES.findOne({_id:this._id}));
    return VIDEOS.findOne({_id:this._id});
  }
});

Template.uploadFormVideos.events({
  'click .vergaleria': function () {
    $('.galeria').slideToggle('fast');
  },
  /*'click .selimg': function (e) {
    idImagen.set(this._id);
  },*/
  'click .checkv': function (e) {
    var img = e.target.querySelector('img');
    if ( img!= null) {
      console.log(img);
    

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
    
    idVideo.set(this._id);
    $('#currentImage').slideDown();
    $('.galeria').slideUp('fast');

  },
  'change #fileInput'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = VIDEOS.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('error al subir el video: ' + error);
        } else {
          idVideo.set(fileObj._id);
          //console.log(idVideo);
          alert('El video "' + fileObj.name + '" Se ha subido correctamente');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});