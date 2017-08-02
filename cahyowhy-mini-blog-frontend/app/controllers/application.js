import Ember from 'ember';

export default Ember.Controller.extend({
  authentication: Ember.observer('applicationRoute.authentication', function () { //executed after dom loaded
    if (this.get("applicationRoute.authentication")) {
      this.createSubscription();
    } else {
      this.removeSubscription();
    }
  }),
  createConsumer(){},
  createSubscription(){},
  removeSubscription(){},
  handleActionCable(){
    const context = this;
    this.createConsumer = function () {
      return context.cableService.createConsumer('ws://localhost:3000/cable?token=' + context.commonService.getToken());
    };
    this.createSubscription = function () {
      context.createConsumer().subscriptions.create({
        channel: 'NotificationChannel',
        user_id: context.commonService.getId()
      }, {
        received: (data) => {
          context.commonService.showCustomNotification(data.message, data.link);
        }
      });
    };
    this.removeSubscription = function () {
      context.createConsumer().subscriptions.remove({
        channel: 'NotificationChannel',
        user_id: context.commonService.getId()
      });
    };
  },
  init(){ //executed first & only at once
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.handleActionCable();
    });
  }
});
