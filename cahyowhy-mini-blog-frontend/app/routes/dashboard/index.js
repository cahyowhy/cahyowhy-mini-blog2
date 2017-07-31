import Ember from 'ember';
import Status from '../../entity/status';
import offsetlimit from '../../entity/offsetlimit';

export default Ember.Route.extend({
  model(){
    let id = this.modelFor('dashboard').id;
    let status = Status.create();
    status.set('status.user_id', id);
    status = status.getChildWithSelection(['user_id']);
    for (let key in offsetlimit()) {
      status[key] = offsetlimit()[key];
    }

    return Ember.RSVP.hash({
      userId: id,
      statuses: this.statusService.find(status)
    });
  },
  setupController(controller, model){
    this.controllerFor('dashboard.index').set('userId', model.userId);
    this.controllerFor('dashboard.index').set('statuses', model.statuses);
  }
});
