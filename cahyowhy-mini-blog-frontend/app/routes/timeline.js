import Ember from 'ember';
import offsetlimit from '../entity/offsetlimit';
import Statuses from '../entity/statuses';
import BaseRouter from '../routes/base';
import ENV from '../config/environment';

export default BaseRouter.extend({
  offset: ENV.APP.DEFAULT_OFFSET,
  controller: null,
  model(){
    this.offset = ENV.APP.DEFAULT_OFFSET;
    return Ember.RSVP.hash({
      statuses: this.doFind("timeline", offsetlimit()),
      authentication: this.doAuth()
    });
  },
  setupController(controller, model){
    if (model.authentication.status === 204) {
      this.controller = controller;
      Statuses.statuses = model.statuses;
      this.controller.set('statuses', model.statuses);
      this.controller.set('ifCreateStatusEmpty', true);
      this.controller.set('imageProfile', this.commonService.getImageProfile());
    } else {
      this.transitionTo('login');
    }
  },
  actions: {
    /**
     * check if status is empty if user
     * decide to leave route,
     * if doesnt empty showed up confirm window
     * @param {boolean} params
     */
    checkStatusEmpty(params){
      this.controller.set('ifCreateStatusEmpty', params);
    },
    onLoadStatuses(){
      const context = this;
      this.offset = this.offset + ENV.APP.DEFAULT_LIMIT;

      this.doFind("timeline", offsetlimit(this.offset)).then(function (response) {
        response.forEach(function (item) {
          context.controller.get('statuses').pushObject(item);
        });

        context.controller.set('ifPostIsEmpty', response.length === 0);
      });
    },
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
      if (!this.controller.get('ifCreateStatusEmpty')) {
        let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");
        /**
         * need to be set ifCreateStatusEmpty = true, every user accept leave the route
         * when the status doesnt empty
         */
        !confirmation ? transition.abort() : this.controller.set('ifCreateStatusEmpty', true);
      }
    },
  }
});
