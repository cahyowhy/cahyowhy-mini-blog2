import Ember from 'ember';
import offsetlimit from '../entity/offsetlimit';
import Statuses from '../entity/statuses';

export default Ember.Route.extend({
  beforeModel(transition){
    if (transition.queryParams.token === null || transition.queryParams.token === undefined) {
      window.location.href = "/not-found";
    }
  },
  model(queryparams){
    return Ember.RSVP.hash({
      statuses: this.timelineService.find(offsetlimit(), queryparams.token)
    });
  },
  setupController(controller, model){
    Statuses.statuses = model.statuses;
    this.controllerFor('timeline').set('statuses', model.statuses);
  },
  actions: {
    didTransition(){
      // Statuses.statuses = [];
    }
  }
});
