import Ember from 'ember';

export default Ember.Component.extend({
  isIconHide: true,
  currentUsserLikes: false,
  isLogedIn: Ember.computed('applicationRoute.authentication', function () {
    return this.get("applicationRoute.authentication");
  }),
  init(){
    this._super(...arguments);
  },
  afterAuthFinished(){
    this._super(...arguments);
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
        Ember.$("#modal-not-login").modal('show');
      }
    }
  }
});
