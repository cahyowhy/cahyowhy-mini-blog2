import Ember from 'ember';

export default Ember.Route.extend({
  facebook_id: null,
  isUserFailFbLogin: false,
  beforeModel(transition){
    if (transition.queryParams.facebook_id !== undefined && transition.queryParams.facebook_id !== null) {
      this.facebook_id = transition.queryParams.facebook_id;
      this.isUserFailFbLogin = true;
    }
  },
  model(){
    return Ember.RSVP.hash({
      facebook_id: this.facebook_id,
      isUserFailFbLogin: this.isUserFailFbLogin
    });
  },
  setupController(controller, model){
    this.controllerFor('sign-up').set('facebook_id', model.facebook_id);
    this.controllerFor('sign-up').set('isUserFailFbLogin', model.isUserFailFbLogin);
  }
});

