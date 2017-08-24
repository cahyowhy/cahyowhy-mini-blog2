import EmberUploader from 'ember-uploader';
import ENV from '../config/environment';
import {generateRandomId} from '../entity/generateRandomId';

export default EmberUploader.FileField.extend({
  url: "",
  files: [],
  filesDidChange: function (files) {
    const context = this;
    this.debug(this.get('url'));
    const authorization = {
      headers: {
        'Authorization': this.commonService.getToken()
      }
    };
    const uploader = EmberUploader.Uploader.create({
      ajaxSettings: authorization,
      paramName: ENV.APP.API_IMAGE_PARAM_NAME,
      url: context.get('url'),
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
    const filename = generateRandomId();
    const file = new File([files[0]], filename);
    this.get('files').pushObject(file);

    /*
     * langsung upload
     * */
    if (!this.get("isEditFirst")) {
      uploader.upload(this.get('files')).then(response => { //response return an array
        let lastdata = response.length - 1;
        context.sendAction("action", response[lastdata].id, ENV.APP.IMAGE_RESOURCES + filename + ".jpg");
        context.commonService.showNotification(response[lastdata].httpstatus);
        files = null;
        context.debug(response);
      }, error => {
        context.debug(error);
      });
    } else {
      /*
       * edit dulu lalu kirim file nya
       * */
      this.sendAction("action", files[0]);
    }
  }
});
