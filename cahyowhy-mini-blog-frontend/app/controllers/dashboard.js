import Ember from 'ember';
import Basecontroller from './base-controller';
import ENV from '../config/environment';
import EmberUploader from 'ember-uploader';
import User from '../entity/user';
let imgWidth, imgHeight;
export default Ember.Controller.extend(Basecontroller, {
  userEntity: User.create(),
  subscription: '',
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
    doUpload(params, modalId, filename){
      const context = this;
      const authorization = {
        headers: {
          'Authorization': this.commonService.getToken()
        }
      };
      const uploader = EmberUploader.Uploader.create({
        ajaxSettings: authorization,
        paramName: ENV.APP.API_IMAGE_PARAM_NAME,
        url: ENV.APP.API_IMAGE,
        method: 'POST'
      });

      uploader.on('progress', e => {
        this.set('progress', parseInt(e.percent));
        context.debug(e);
      });
      uploader.on('didUpload', e => {
        context.debug(e);
      });
      uploader.on('didError', (jqXHR, textStatus) => {
        // Handle unsuccessful upload
        context.debug(textStatus);
      });

      let user = this.get('userEntity');
      uploader.upload([params]).then(response => {
        /**
         * response return an array
         */
        user.set("user.imageurl", filename + ".jpg");
        context.doUpdate('user', user.select(['imageurl'])).then(function () {
          context.set("user.imageurl", ENV.APP.API_URL + response[0].path.url);
          context.commonService.showCustomNotification("Berhasil Menmperbarui foto profile");
          location.reload();
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
