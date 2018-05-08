import { Template }    from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

idImagen = new ReactiveVar('none');
Template.uploadFormImages.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  idImagen.set('none');
});
Template.uploadFormImages.onRendered(function(){
  this.autorun(function(){
    if (idImagen.get() == 'none') {
      $('#currentImage').slideUp('fast');
    }
    
  })
})
Template.uploadFormImages.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  },
  currentImage : function(){
    if (idImagen.get() != 'none') {
      var image = IMAGES.findOne({_id:idImagen.get()});
      return image;
    }
    return false;
  },
  listGaleria: function(){
    return IMAGES.collection.find({userId:Meteor.userId()}).fetch();
  },
  itemImg: function(){
    //console.log(IMAGES.findOne({_id:this._id}));
    return IMAGES.findOne({_id:this._id});
  }
});

Template.uploadFormImages.events({
  'click .vergaleria': function () {
    $('.galeria').slideToggle('fast');
  },
  'click .selimg': function (e) {
    idImagen.set(this._id);
  },
  'click .check': function (e) {
    //console.log(this);
    $('.check i').each(function(index, el) {
        if ($(this).hasClass('fa-check-circle-o')) {
          //console.log('tiene');
          $(this).removeClass('fa-check-circle-o').addClass('fa-circle-o');
          $(this).parent().parent().removeClass().addClass('bg-secondary');
        }
    });
    $('#'+this._id+'c i').removeClass('fa-circle-o').addClass('fa-check-circle-o');
    $('#'+this._id+'c i').parent().parent().removeClass('bg-secondary').addClass('bg-primary');
    
    idImagen.set(this._id);
    $('#currentImage').slideDown('fast', function() {
      $('.galeria').slideUp('fast');
    });
    

  },
  'change #fileInput'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = IMAGES.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('error al subir la imagen: ' + error);
        } else {
          idImagen.set(fileObj._id);
          //console.log(idImagen);
          alert('La imagen "' + fileObj.name + '" Se ha subido correctamente');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});