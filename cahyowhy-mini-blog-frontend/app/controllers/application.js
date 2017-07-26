import Ember from 'ember';
import BaseController from './base-controller';

export default Ember.Controller.extend(BaseController, {
  subscription: '',
  afterRender(){
    const context = this;
    let consumer = this.cableService.createConsumer('ws://localhost:3000/cable?token=' + this.commonService.getToken());
    let subscription = consumer.subscriptions.create({channel: 'NotificationChannel', user_id: this.commonService.getId()}, {
      received: (data) => {
        context.debug(data);
      }
    });
  }
});
