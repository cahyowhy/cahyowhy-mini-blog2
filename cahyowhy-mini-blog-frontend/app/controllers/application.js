import Ember from 'ember';
import Statuses from '../entity/statuses';
import mainService from '../routes/main-service';

export default Ember.Controller.extend(mainService, {
  router: Ember.inject.service("-routing"),
  currentRouteName: Ember.computed('router', function () {
    return this.get('router.router.currentRouteName');
  }),
  authentication: Ember.observer('authentication', function () { //executed after dom loaded
    if (this.get("authentication")) {
      this.handleActionCable();
    } else {
      this.removeSubscription();
    }
  }),
  handleActionCable(){
    const context = this;
    let consumer = context.cableService.createConsumer('ws://localhost:3000/cable?token=' + context.commonService.getToken());
    let subscribeNotification = consumer.subscriptions.create({
      channel: 'NotificationChannel',
      user_id: context.commonService.getId()
    }, {
      received: (data) => {
        if (data.link !== undefined && data.link !== null) {
          context.commonService.showCustomNotification(data.message, data.link);
        }

        if (data.data !== undefined && data.data !== null && context.get('target').currentPath === "timeline") {
          context.debug("new notification has come in!");
          context.debug(data.data);
          Statuses.statuses.unshiftObject(JSON.parse(data.data));
        }
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
  },
  actions: {
    onTransitionToSearch(params){
      this.transitionToRoute('search', {
        queryParams: {search: params}
      });
    }
  }
});
