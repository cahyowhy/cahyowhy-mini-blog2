import Ember from 'ember';
import BaseController from '../controllers/base-controller';

export default Ember.Component.extend(BaseController, {
  isIconHide: true,
  currentUsserLikes: false,
  isLogedIn: Ember.computed('applicationRoute.authentication', function () {
    return this.get("applicationRoute.authentication");
  }),
  didInsertElement(){
    this._super(...arguments);
    const context = this;

    this.get("likes").forEach(function (item) {
      if (item.user.id.toString() === context.commonService.getId()) {
        context.set("currentUsserLikes", true);
      }
    });
  },
  actions: {
    onFav(){
      if (this.get('isLogedIn')) {
        this.set("currentUsserLikes", !this.get("currentUsserLikes"));
        this.sendAction("action", this.get("_id"));
      } else {
        this.showAlertLogin();
      }
    }
  }
});
