import Ember from 'ember';
import BaseController from '../controllers/base-controller';
import Image from '../entity/image';
import ENV from '../config/environment';

export default Ember.Component.extend(BaseController, {
  images: [],
  url: ENV.APP.API_IMAGE,
  userId: 0,
  isUserIdEqRouteId: Ember.computed('userId', 'routeUserId', 'isTimeline', function () {
    return this.get('isTimeline') ? true : this.get("userId") === this.get("routeUserId");
  }),
  clearAny(){
    this.set('images', []);
    this.set('userId', 0);
  },
  didInsertElement(){
    this._super(...arguments);
    let image = Image.create();
    const context = this;
    this.clearAny();
    this.set('userId', this.commonService.getId());
    image.set('image.user_id', this.get('userId'));
    image = image.getChildWithSelection(['user_id']);

    this.doFind('image', image).then(function (results) {
      results.forEach(function (item) {
        context.get('images').pushObject({
          id: item.id,
          src: item.path.url
        });
      });
    })
  },
  actions: {
    onAddImage(index, id, src){
      if (this.get("isUserIdEqRouteId")) {
        this.sendAction("onAddImage", index, id, src);
      }
    },
    onDelImage(index, id, src){
      if (this.get("isUserIdEqRouteId")) {
        const context = this;
        Ember.$('#modal-delete-photo').modal('show');
        Ember.$('#modal-delete-photo').on('shown.bs.modal', function () {
          Ember.$(this).find('a.delete-photo').on('click', function () {
            context.doRemove("image", id).then(function () {
              let images = [];
              context.get("images").forEach(function (item) {
                if (item.id !== id) {
                  images.push(item);
                }
              });
              context.set("images", images);
              Ember.$('#modal-delete-photo').modal('hide');
              context.sendAction("onDelImage", index, id, src);
            });
          })
        });
      }
    },
    onImageChange(idFile, urlFile){ //urlFile, file yg ada di server, sudah di upload
      if (this.get("isUserIdEqRouteId")) {
        this.get('images').pushObject({
          id: idFile,
          src: urlFile
        });
      }
    },
  }
});
