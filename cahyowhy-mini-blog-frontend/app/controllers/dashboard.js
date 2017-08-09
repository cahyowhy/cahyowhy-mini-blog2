import Ember from 'ember';
import Basecontroller from './base-controller';
import ENV from '../config/environment';
import EmberUploader from 'ember-uploader';
import User from '../entity/user';
let imgWidth, imgHeight;
export default Ember.Controller.extend(Basecontroller, {
  userEntity: User.create(),
  subscription: '',
  url: ENV.APP.API_IMAGE,
  dataURLtoBlob(dataurl) {
    let data = dataurl.split(','),
      mimetypeFile = data[0].match(/:(.*?);/)[1],
      bytestring = atob(data[1]),
      index = bytestring.length, blobArray = new Uint8Array(index);
    while (index--) {
      blobArray[index] = bytestring.charCodeAt(index);
    }
    return new Blob([blobArray], {type: mimetypeFile});
  },
  actions: {
    onImageChange(file){
      let reader = new FileReader();
      reader.onload = function () {
        let dataURL = reader.result;
        Ember.$('#myModal').modal({backdrop: 'static', keyboard: false, show: 'true'});
        Ember.$('#img-cropper').attr('src', dataURL);
        Ember.$('#img-cropper').cropper({
          aspectRatio: 4 / 4,
          crop: function (e) {
            imgWidth = e.width;
            imgHeight = e.height;
          }
        });
      };
      reader.readAsDataURL(file);
    },
    onUploadPictureProfile(){
      const context = this;
      let imgUrl = Ember.$('#img-cropper').cropper('getCroppedCanvas', {
        width: imgWidth,
        height: imgHeight
      }).toDataURL("image/png");
      let blob = this.dataURLtoBlob(imgUrl);
      let fileUploadNewBlob = new File([blob], "imageprofile.jpg");

      let uploader = EmberUploader.Uploader.create({
        ajaxSettings: {
          headers: {
            'Authorization': context.commonService.getToken()
          }
        },
        paramName: ENV.APP.API_IMAGE_PARAM_NAME,
        url: context.get('url'),
        method: 'POST'
      });

      let user = this.get('userEntity');
      uploader.upload([fileUploadNewBlob]).then(response => {
        user.set("user.imageurl", ENV.APP.API_URL + response[0].path.url);
        context.doUpdate('user', user.select(['imageurl'])).then(function () {
          context.set("user.imageurl", ENV.APP.API_URL + response[0].path.url);
          context.commonService.showCustomNotification("Berhasil Menmperbarui foto profile");
        });
      }, error => {
        context.debug(error);
      });
    },
    onCloseModal(){
      Ember.$('#myModal').modal('hide');
      Ember.$('#img-cropper').cropper('destroy');
    },
  }
});
