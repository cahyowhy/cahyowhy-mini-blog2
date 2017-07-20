import Ember from 'ember';

export default Ember.Route.extend({
  model(param){
    return Ember.RSVP.hash({
      id: param.id,
      user: this.userService.findUserById(param.id)
    })
  },
  afterModel(model){
    const context = this;
    if (model.user.imageurl === null || model.user.imageurl === undefined) {
      model.user.imageurl = "/img/no-image.png";
    }
  },
  setupController(controller, model){
    this.controllerFor('dashboard').set('user', model.user);
  }
});
