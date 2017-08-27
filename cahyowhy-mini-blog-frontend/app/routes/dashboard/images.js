import Ember from 'ember';
import Image from '../../entity/image';
import offsetlimit from '../../entity/offsetlimit';
import BaseRouter from '../base';
import ENV from '../../config/environment';

export default BaseRouter.extend({
  controller: null,
  images: null,
  offset: ENV.APP.DEFAULT_OFFSET,
  model(){
    this.offset = ENV.APP.DEFAULT_OFFSET;
    let image = new Image().getInitializeValue();
    image.image.user_id = this.modelFor('dashboard').id;
    image = new Image().getChildValue(image);
    for (let key in offsetlimit()) {
      image[key] = offsetlimit()[key];
    }

    return Ember.RSVP.hash({
      images: this.doFind("image", image)
    });
  },
  afterRender(){
    this._super(...arguments);
    this.controller.set('isContentEmpty', Ember.computed.equal('images.length', 0));
  },
  setupController(controller, model){
    this.controller = controller;
    let images = [];
    model.images.forEach(function (item) {
      images.push({
        id: item.id,
        src: item.path.url
      });
    });
    model.images = images;

    this.images = model.images;
    this.controller.set('images', this.images);
  },
  actions: {
    onLoadImage(){
      const context = this;
      this.offset = this.offset + ENV.APP.DEFAULT_LIMIT;
      let offsetlimitSetup = offsetlimit(this.offset);

      let image = new Image().getInitializeValue();
      image.image.user_id = this.modelFor('dashboard').id;
      image = new Image().getChildValue(image);
      for (let key in offsetlimitSetup) {
        image[key] = offsetlimitSetup[key];
      }

      this.doFind("image", image).then(function (response) {
        if (response.length === 0) {
          context.controller.set('isContentEmpty', true);
        }
        response.forEach(function (item) {
          const image = {
            id: item.id,
            src: ENV.APP.API_URL + item.path.url
          };

          context.images.pushObject(image);
          context.controller.get('images').pushObject(image);
        });
      });
    }
  }
});
