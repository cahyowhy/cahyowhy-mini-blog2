import Ember from 'ember';
import BaseRouter from '../base';
import ENV from '../../config/environment';

export default BaseRouter.extend({
  model(){
    const query = {
      user_id: this.modelFor('dashboard').id,
      offset: ENV.APP.DEFAULT_OFFSET,
      limit: ENV.APP.DEFAULT_LIMIT
    };

    return Ember.RSVP.hash({
      notifications: this.notificationService.find(query)
    });
  }
});
