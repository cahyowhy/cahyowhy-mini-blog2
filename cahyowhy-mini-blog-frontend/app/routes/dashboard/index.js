import Ember from 'ember';
import offsetlimit from '../../entity/offsetlimit';
import Status from '../../entity/status';
import ENV from '../../config/environment';
import BaseRouter from '../base';

export default BaseRouter.extend({
  offset: ENV.APP.DEFAULT_OFFSET,
  controller: null,
  statuses: null,
  beforeModel(){
    this.controller = null;
  },
  model(){
    this.offset = ENV.APP.DEFAULT_OFFSET;
    let id = this.modelFor('dashboard').id;
    let status = new Status().getInitializeValue();
    status.status.user_id = id;
    delete status.status.imagestatuses_attributes;
    status = new Status().getChildValue(status);
    for (let key in offsetlimit()) {
      status[key] = offsetlimit()[key];
    }

    return Ember.RSVP.hash({
      statuses: this.doFind("status", status),
      routeUserId: id,
      imageProfile: this.modelFor('dashboard').user.imageurl
    });
  },
  afterRender(){
    this._super(...arguments);
    this.controller.set('ifPostIsEmpty', Ember.computed.equal('statuses.length'), 0);
  },
  setupController(controller, model){
    this.controller = controller;
    this.statuses = model.statuses;
    this.controller.set('statuses', this.statuses);
    this.controller.set('routeUserId', model.routeUserId);
    this.controller.set('ifCreateStatusEmpty', true);
    this.controller.set('id', model.routeUserId);
    this.controller.set('imageProfile', model.imageProfile);
  },
  actions: {
    willTransition(transition){
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
    checkStatusEmpty(params){
      this.controller.set('ifCreateStatusEmpty', params);
    },
    onLoadStatuses(){
      const context = this;
      this.offset = this.offset + ENV.APP.DEFAULT_LIMIT;

      let id = this.controller.get("id");
      let status = new Status().getInitializeValue();
      status.status.user_id = id;
      delete status.status.imagestatuses_attributes;
      status = new Status().getChildValue(status);

      for (let key in offsetlimit(this.offset)) {
        status[key] = offsetlimit(this.offset)[key];
      }

      this.doFind("status", status).then(function (response) {
        response.forEach(function (item) {
          context.statuses.pushObject(item);
          context.controller.get('statuses').pushObject(item);
        });

        response.length == 0 ? context.controller.set('ifPostIsEmpty', true) : context.controller.set('ifPostIsEmpty', false);
      });
    }
  }
});
