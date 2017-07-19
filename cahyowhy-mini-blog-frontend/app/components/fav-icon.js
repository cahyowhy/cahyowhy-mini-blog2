import Ember from 'ember';

export default Ember.Component.extend({
  currentUsserLikes: false,
  init(){
    this._super(...arguments);
  },
  didInsertElement(){
    this._super(...arguments);
    const context = this;
    this.debug(this.get("likes"));
    /*this.get("likes").forEach(function (item) {
      if (item.user.id === context.commonService.getId()) {
        context.set("currentUsserLikes", true);
      }
    });*/
  },
  actions: {
    onFav(event){
      this.set("currentUsserLikes", !this.get("currentUsserLikes"));
      this.sendAction("action", this.get("_id"));
    }
  }
});
