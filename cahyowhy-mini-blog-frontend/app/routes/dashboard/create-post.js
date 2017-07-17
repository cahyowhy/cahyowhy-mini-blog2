import Ember from 'ember';
import ENV from '../../config/environment'

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
      images: null,
    });
  },
  setupController(controller,model){
    this.controllerFor('dashboard.create-post').set('images', model.images);
  },
  afterModel(model, transition){
    const context = this;
    Ember.run.schedule('afterRender', function () { //due to fastboot, i can't set the localStorage here :(
      context.controllerFor('dashboard.create-post').setImages();
    });
  }
});
