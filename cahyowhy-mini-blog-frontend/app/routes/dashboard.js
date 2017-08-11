import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  model(param){
    return Ember.RSVP.hash({
      id: param.id,
      user: this.userService.find(param.id)
    })
  },
  afterModel(model){
    const condition = model.user.imageurl === null || model.user.imageurl === undefined;
    condition ? model.user.imageurl = "/img/no-image.png" : model.user.imageurl = ENV.APP.API_URL + model.user.imageurl;
  },
  setupController(controller, model){
    this.controllerFor('dashboard').set('user', model.user);
    this.controllerFor('dashboard.index').set('id', model.id);
  }
});
