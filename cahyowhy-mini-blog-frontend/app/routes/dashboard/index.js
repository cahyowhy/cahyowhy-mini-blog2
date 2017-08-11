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
      statuses: this.statusService.find(status),
      routeUserId: id
    });
  },
  setupController(controller, model){
    this.controllerFor('dashboard.index').set('statuses', model.statuses);
    this.controllerFor('dashboard.index').set('routeUserId', model.routeUserId);
  },
  actions: {
    willTransition(transition){
      /**
       * be sure to check this property when user
       * accidentally click link to
       * and display the confirmation tab
       */
      if (!this.controllerFor('dashboard.index').get('ifCreateStatusEmpty')) {
        let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");
        /**
         * need to be set ifCreateStatusEmpty = true, every user accept leave the route
         * when the status doesnt empty
         */
        !confirmation ? transition.abort() : this.controllerFor('dashboard.index').set('ifCreateStatusEmpty', true);
      }
    },
  }
});
