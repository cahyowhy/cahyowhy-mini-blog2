import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
      images: this.imageService.findImageByUserid(this.modelFor('dashboard').id)
    })
  },
  setupController(controller, model){
    this.controllerFor('dashboard.images').set('images', model.images);
  },
  afterModel(model){
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
