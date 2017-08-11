import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import ENV from '../config/environment';

export default EmberUploader.FileField.extend({
  url: "",
  authorization: Ember.computed('localStorage', function () {
    return {
      headers: {
        'Authorization': this.localStorage.getItem('user').auth_token
      }
    };
  }),
  files: [],
  filesDidChange: function (files) {
    const context = this;
    this.debug(this.get('url'));
    const uploader = EmberUploader.Uploader.create({
      ajaxSettings: context.get("authorization"),
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
    this.get('files').pushObject(files[0]);

    /*
     * langsung upload
     * */
    if (!this.get("isEditFirst")) {
      uploader.upload(this.get('files')).then(response => { //response return an array
        let lastdata = response.length - 1;
        context.sendAction("action",response[lastdata].id, response[lastdata].path.url);
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

    /*if ((files[0].size < 10000000) && (this.get("files").length < 5)) {
     this.get('files').pushObject(files[0]);
     this.sendAction("action", files[0]);
     this.set('uploader', uploader);
     } else {
     alert("Batas Upload Maksimal Sudah terpenuhi");
     }*/
  }
});
