import Ember from 'ember';

export default Ember.Route.extend({
  model(param){
    return Ember.RSVP.hash({
      id: param.id,
      user: null
    })
  },
  afterModel(model){
    const context = this;
    this.userService.findUserById(model.id).then(function (response) {
      if (response.imageurl === null || response.imageurl === undefined) {
        response.imageurl = "/img/no-image.png";
      }

      model.user = response;
      context.debug(response);
    }).catch(function () {
      context.transitionTo('/not-found');
    });
  },
  setupController(controller, model){
    this.controllerFor('dashboard').set('user', model.user);
  }
});
