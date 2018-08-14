import { Template }    from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './uploadImages.html';

idImagen = new ReactiveVar('none');
Template.uploadFormImages.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  idImagen.set('none');
});
Template.uploadFormImages.onRendered(function(){
  this.autorun(function(){
    if (idImagen.get() == 'none') {
      $('#currentImage').slideUp('fast');
    }else{
      $('#'+idImagen.get()+'c').click();
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
    //CAMBIAR PERMISOS A SITIO Y NO ASI A USER
    return IMAGES.collection.find({}).fetch();
  },
  itemImg: function(){
    //console.log(IMAGES.findOne({_id:this._id}));
    return IMAGES.findOne({_id:this._id});
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
    if ( img!= null) {
      //console.log(img);
    

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
    
    idImagen.set(this._id);
    $('#currentImage').slideDown();
    $('.galeria').slideUp('fast');

  },
  'change #fileInput'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = IMAGES.insert({
        file: e.currentTarget.files[0],
        meta : {
          idSitio :FlowRouter.getParam("titulo"),
        },
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




idImagenDesc = new ReactiveVar('none');

Template.uploadFormImagesDesc.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  idImagenDesc.set('none');
});
Template.uploadFormImagesDesc.onRendered(function(){
  this.autorun(function(){
    if (idImagenDesc.get() != 'none') {

      //$('#'+idImagenDesc.get()+'desc').click();
      //console.log($('#'+idImagenDesc.get()+'desc'));
      var img = $('#'+idImagenDesc.get()+'desc').children('img').attr('src');
      //console.log(img);
      if (img == undefined) {
        //alert("error");
        return;
      }
      $('#imgdesc').attr('src', img);
     
      $('.checkdesc i').each(function(index, el) {
          if ($(this).hasClass('fa-check-circle-o')) {
            //console.log('tiene');
            $(this).removeClass('fa-check-circle-o').addClass('fa-circle-o');
            $(this).parent().parent().removeClass().addClass('bg-secondary');
          }
      });
      $('#'+idImagenDesc.get()+'desc i').removeClass('fa-circle-o').addClass('fa-check-circle-o');
      $('#'+idImagenDesc.get()+'desc i').parent().parent().removeClass('bg-secondary').addClass('bg-primary');
      $('#currentImage').slideDown(); 
    }
    
  });
  
})
Template.uploadFormImagesDesc.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  },
  
  listGaleria: function(){
    return IMAGES.collection.find({}).fetch();
  },
  itemImg: function(){
    return IMAGES.findOne({_id:this._id});
  }
});

Template.uploadFormImagesDesc.events({
  
  'click .checkdesc': function (e) {
    idImagenDesc.set(this._id);
    $('#imagendesc').modal('hide');
  },
  'change #fileInput'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = IMAGES.insert({
        file: e.currentTarget.files[0],
        meta : {
          idSitio :FlowRouter.getParam("titulo"),
        },
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
          //idImagenDesc.set(fileObj._id);
          
          alert('La imagen "' + fileObj.name + '" Se ha subido correctamente');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});