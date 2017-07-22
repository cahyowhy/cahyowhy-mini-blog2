import Ember from 'ember';

export default Ember.Component.extend({
  isIconHide: true,
  currentUsserLikes: false,
  /*
   * watch for authentication if the value is changed,
   * only work in 1st time
   * */
  authentication: Ember.observer('applicationRoute.authentication', function () {
    if (this.get("applicationRoute.authentication")) {
      this.showIcon();
    }
  }),
  init(){
    this._super(...arguments);
  },
  afterAuthFinished(){
    this._super(...arguments);
    this.debug("invoke me when ready");
  },
  showIcon(){
    this.set("isIconHide", false);
  },
  didInsertElement(){
    this._super(...arguments);
    const context = this;
    if (this.applicationRoute.get("authentication")) {
      this.showIcon();
    }

    this.get("likes").forEach(function (item) {
      if (item.user.id === context.commonService.getId()) {
        context.set("currentUsserLikes", true);
      }
    });
  },
  actions: {
    onFav(){
      this.set("currentUsserLikes", !this.get("currentUsserLikes"));
      this.sendAction("action", this.get("_id"));
    }
  }
});
