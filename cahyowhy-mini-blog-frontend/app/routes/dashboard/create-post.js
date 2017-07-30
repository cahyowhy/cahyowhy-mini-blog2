import Ember from 'ember';
import ENV from '../../config/environment'
import Image from '../../entity/image';
import offsetlimit from '../../entity/offsetlimit';

export default Ember.Route.extend({
  model(){
    let image = Image.create();
    image.set('image.user_id', this.modelFor('dashboard').id);
    image = image.getChildWithSelection(['user_id']);
    for (let key in offsetlimit()) {
      image[key] = offsetlimit()[key];
    }

    return Ember.RSVP.hash({
      images: this.imageService.find(image),
    });
  },
  setupController(controller, model){
    this.controllerFor('dashboard.create-post').set('images', model.images);
  },
  afterModel(model, transition){
    let images = [];
    model.images.forEach(function (item) {
      images.push({
        id: item.id,
        src: ENV.APP.API_URL + item.path.url
      });
    });
    model.images = images;
  }
});
