import Ember from 'ember';
import mainService from '../routes/main-service';

export default Ember.Component.extend(mainService, {
  isIconHide: true,
  currentUsserLikes: false,
  isLogedIn: Ember.computed('authentication', function () {
    return this.get("authentication");
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
