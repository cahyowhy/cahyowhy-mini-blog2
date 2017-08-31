import Ember from 'ember';
import BaseRouter from '../base';
import ENV from '../../config/environment';

export default BaseRouter.extend({
  controller: null,
  offset: ENV.APP.DEFAULT_OFFSET,
  model(){
    this.offset = ENV.APP.DEFAULT_OFFSET;
    const query = {
      user_id: this.modelFor('dashboard').id,
      offset: ENV.APP.DEFAULT_OFFSET,
      limit: ENV.APP.DEFAULT_LIMIT
    };

    return Ember.RSVP.hash({
      notifications: this.doFind("notification", query)
    });
  },
  setupController(controller, model){
    this.controller = controller;
    model.notifications.forEach(function (item) {
      const link = item.link;
      item.link = link.split("/")[0];
      item.linkId = link.split("/")[1];
    });

    controller.set('notifications', model.notifications);
    controller.set('isContentEmpty', model.notifications.length === 0);
  },
  actions: {
    onLoadNotification(){
      this.offset = this.offset + ENV.APP.DEFAULT_LIMIT;
      const query = {
        user_id: this.modelFor('dashboard').id,
        offset: this.offset,
        limit: ENV.APP.DEFAULT_LIMIT
      };
      const context = this;

      this.doFind("notification", query).then(function (results) {
        context.controller.set('isContentEmpty', results.length === 0);
        results.forEach(function (item) {
          context.controller.get('notifications').pushObject(item);
        });
      });
    }
  }
});
