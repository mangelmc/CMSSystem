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
    return VIDEOS.collection.find({});
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
  'click .checkvideo': function (e) {
    var video = $(e.currentTarget).parent().siblings(".embed-responsive").children().children();
    //console.log(video);
    var src = video.attr('src');
    var type = video.attr('type');
      var html = '<div class="row"><div class="col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 "><div class="embed-responsive embed-responsive-16by9 mx-auto px-sm-1 px-md-2 px-lg-3 p-3">' +
        '<video class="embed-responsive-item" controls="auto" style="background-color: black;">' +
          '<source src="'+src +'" type="'+ type +'" >'
        '</video></div></div></div>';
    

      es.summernote('focus');
      
      //document.execCommand('insertHtml', null, html);
      es.summernote('pasteHTML', html);

      $('#descripcion').focus();

      es.summernote('focus');
    
    $('.checkvideo i').each(function(index, el) {
        if ($(this).hasClass('fa-check-circle-o')) {
          //console.log('tiene');
          $(this).removeClass('fa-check-circle-o').addClass('fa-circle-o');
          //$(this).parent().parent().removeClass().addClass('bg-secondary');
        }
    });
    $('#'+this._id+'vid i').removeClass('fa-circle-o').addClass('fa-check-circle-o');
    //$('#'+this._id+'c i').parent().parent().removeClass('bg-secondary').addClass('bg-primary');
    
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