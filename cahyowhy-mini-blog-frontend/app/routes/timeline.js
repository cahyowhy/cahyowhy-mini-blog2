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
    /*
     * on the first refresh this method won't be called. after the page is transition
     * to another page, now its will be called
     * */
    willTransition(transition){
      /*
       * when move to another page be sure to empty this status
       * */
      Statuses.statuses = [];
      /**
       * be sure to check this property when user
       * accidentally click link to
       * and display the confirmation tab
       */
      if (!this.controllerFor('timeline').get('ifCreateStatusEmpty')) {
        let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");
        /**
         * need to be set ifCreateStatusEmpty = true, every user accept leave the route
         * when the status doesnt empty
         */
        !confirmation ? transition.abort() : this.controllerFor('timeline').set('ifCreateStatusEmpty', true);
      }
    },
  }
});
