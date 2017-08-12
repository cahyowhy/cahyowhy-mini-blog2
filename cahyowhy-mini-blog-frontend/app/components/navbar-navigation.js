import Ember from 'ember';

export default Ember.Component.extend({
  id: '',
  token: '',
  search: '',
  isLinkProfileVisible: false,
  authentication: Ember.observer("applicationRoute.authentication", function () {
    if (this.get("applicationRoute.authentication")) {
      this.toggleNav();
    }
  }),
  didInsertElement(){
    this._super(...arguments);
    this.set("token", this.commonService.getToken());
  },
  toggleNav(){
    this.debug("nav change!");
    let id = this.commonService.getId();
    this.set('id', id);
    this.set('isLinkProfileVisible', true);
  },
  actions: {
    onLogOut(){
      this.commonService.clearCookies();
      window.location.replace("/");
    },
    onsearch(){
      if (this.get('search').length > 3) {
        this.sendAction('action', this.get('search'));
      }
    }
  }
});
