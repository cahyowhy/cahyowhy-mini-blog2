import Ember from 'ember';
import mainService from '../routes/main-service';

export default Ember.Component.extend(mainService, {
  id: '',
  token: '',
  search: '',
  isLinkProfileVisible: false,
  authenticate: Ember.observer("authentication", function () {
    if (this.get("authentication")) {
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
      Ember.run.later(function () {
        window.location.replace("/");
      }, 2000);
    },
    onsearch(){
      if (this.get('search').length > 3) {
        this.sendAction('action', this.get('search'));
      }
    }
  }
});
