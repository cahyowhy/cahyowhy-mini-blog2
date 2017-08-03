import Ember from 'ember';

export default Ember.Controller.extend({
  authentication: Ember.observer('applicationRoute.authentication', function () { //executed after dom loaded
    if (this.get("applicationRoute.authentication")) {
      this.handleActionCable();
    } else {
      this.removeSubscription();
    }
  }),
  removeSubscription(){
  },
  handleActionCable(){
    const context = this;
    let consumer = context.cableService.createConsumer('ws://localhost:3000/cable?token=' + context.commonService.getToken());
    let subscribeNotification = consumer.subscriptions.create({
      channel: 'NotificationChannel',
      user_id: context.commonService.getId()
    }, {
      received: (data) => {
        context.commonService.showCustomNotification(data.message, data.link);
      }
    });

    let subscribeUserAppearance = consumer.subscriptions.create({channel: 'UserappearanceChannel'}, {
      disconnected: () => {
        //if disconnected do whatever like showing some fancy on browser. NOT to perform action from actioncable
      },
      connected: () => {
        subscribeUserAppearance.perform("appear", {user_id: context.commonService.getId()});
      }
    });
  }
});
