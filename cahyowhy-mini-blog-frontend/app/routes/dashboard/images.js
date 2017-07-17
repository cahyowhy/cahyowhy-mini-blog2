import Ember from 'ember';
import ENV from '../../config/environment'

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
      images: null
    })
  },
  setupController(controller, model){
    this.controllerFor('dashboard.images').set('images', model.images);
  },
  afterModel(model){
    const context = this;
    Ember.run.schedule('afterRender', function () {
      context.controllerFor('dashboard.images').setImages();
    });
  }
});