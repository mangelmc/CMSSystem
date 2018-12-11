import {
  Template
} from 'meteor/templating';
import {
  ReactiveVar
} from 'meteor/reactive-var';

idVideo = new ReactiveVar('none');
Template.uploadFormVideos.onCreated(function () {

  idVideo.set('none');
});
Template.uploadFormVideos.onRendered(function () {
  /*this.autorun(function(){
    if (idImagen.get() == 'none') {
      $('#currentImage').slideUp('fast');
    }else{
      $('#'+idImagen.get()+'c').click();
    }
    
  })*/
})
Template.uploadFormVideos.helpers({

  listGaleria: function () {
    return VIDEOS.find({});
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
      '<source src="' + src + '" type="' + type + '" >'
    '</video></div></div></div>';


    es.summernote('focus');

    //document.execCommand('insertHtml', null, html);
    es.summernote('pasteHTML', html);

    $('#descripcion').focus();

    es.summernote('focus');

    $('.checkvideo i').each(function (index, el) {
      if ($(this).hasClass('fa-check-circle-o')) {
        //console.log('tiene');
        $(this).removeClass('fa-check-circle-o').addClass('fa-circle-o');
        //$(this).parent().parent().removeClass().addClass('bg-secondary');
      }
    });
    $('#' + this._id + 'vid i').removeClass('fa-circle-o').addClass('fa-check-circle-o');
    //$('#'+this._id+'c i').parent().parent().removeClass('bg-secondary').addClass('bg-primary');

    idVideo.set(this._id);
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

    let split = file.name.split(".");
    let regexp = new RegExp("avi|mpg|mpeg|flv|mp4|wmv|webm", "i");
    let res = regexp.test(split[split.length - 1]);
    if (file.size > 1024 * 1024 * 45 || !res) {
      alert('Puedes subir videos con un peso no mayor a 45 MBs \n Y con extensiones avi, mpg, mpeg, flv, mp4, wmv o webm');
      return;
    }


    handleFileSelect(file);
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

        Meteor.call('insVideo', obj, function (error, result) {
          if (error) {
            alert('hubo un error al intentar guardar en la base de datos');
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