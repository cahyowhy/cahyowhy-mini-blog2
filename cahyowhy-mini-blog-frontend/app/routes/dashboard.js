import Ember from 'ember';
import BaseRouter from './base';
import User from '../entity/user';
import ENV from '../config/environment';
import EmberUploader from 'ember-uploader';

const {get, computed} = Ember;
export default BaseRouter.extend({
  controller: null,
  isCurrentUser: false,
  isLogedIn: false,
  isFollowing: false,
  userEntity: new User().getInitializeValue(),
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
  model(param){
    this.isLogedIn = this.commonService.getId() !== null;
    let hash;
    const isCurrentUser = this.commonService.getId() === param.id.toString();
    this.isCurrentUser = isCurrentUser;
    hash = (isCurrentUser || !this.isLogedIn) ? {
      isCurrentUser: isCurrentUser,
      id: param.id,
      user: this.doFind('user', param.id),
      isLogedIn: this.isLogedIn
    } : {
      isCurrentUser: isCurrentUser,
      id: param.id,
      user: this.doFind('user', param.id),
      isFollowing: this.doFind("user", "isfollow/" + param.id),
      isLogedIn: this.isLogedIn
    };

    return Ember.RSVP.hash(hash)
  },
  afterRender(){
    this._super(...arguments);
    if (!this.isCurrentUser && this.isLogedIn) {
      this.controller.set('btnFollow', computed('isFollowing', () => {
        this.debug(this.get('isFollowing'));
        return this.get('isFollowing') ? "unfollow" : "follow";
      }));

      this.controller.set('navigationClass', computed('isCurrentUser', function () {
        this.debug(this.get('isCurrentUser'));
        return this.get('isCurrentUser') ? "col-sm-5ths" : "col-sm-4";
      }));
    }
  },
  setupController(controller, model){
    this.controller = controller;
    this.controller.set('isCurrentUser', this.isCurrentUser);
    this.controller.set('isLogedIn', model.isLogedIn);
    this.controller.set('user', model.user);
    this.controller.set('id', model.id);
    this.controller.set('subscription', '');

    if (!this.isCurrentUser && this.isLogedIn) {
      this.isFollowing = model.isFollowing.isfollowing;
      this.controller.set('isFollowing', this.isFollowing);
    }

    /**
     * check later change to modelFor
     */
  },
  actions: {
    onFollowing(){
      if (!this.controller.get('isCurrentUser')) {
        const userFollowing = {id: this.controller.get('id')};
        const context = this;
        if (this.controller.get('isFollowing')) {
          this.doRemove("relation", null, userFollowing).then(function (result) {
            context.controller.set('isFollowing', false);
          });
        } else {
          this.doSave("relation", userFollowing).then(function (result) {
            context.controller.set('isFollowing', true);
          });
        }
      }
    },
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
        // this.set('progress', parseInt(e.percent));
        context.debug(e);
      });
      uploader.on('didUpload', e => {
        context.debug(e);
      });
      uploader.on('didError', (jqXHR, textStatus) => {
        // Handle unsuccessful upload
        context.debug(textStatus);
      });

      let user = this.controller.get('userEntity');
      uploader.upload([params]).then(response => {
        /**
         * response return an array
         */
        user.set("user.imageurl", filename + ".jpg");
        context.doUpdate('user', user.select(['imageurl'])).then(function () {
          context.controller.set("user.imageurl", ENV.APP.API_URL + response[0].path.url);
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
    }
  }
});
