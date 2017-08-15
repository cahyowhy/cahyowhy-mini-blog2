import Ember from 'ember';

export default Ember.Route.extend({
  model(param){
    return Ember.RSVP.hash({
      id: param.id,
      user: this.userService.find(param.id)
    })
  },
  setupController(controller, model){
    this.controllerFor('dashboard').set('user', model.user);
    this.controllerFor('dashboard.index').set('imageProfile', model.user.imageurl);
    this.controllerFor('dashboard.index').set('id', model.id);
  }
});
