import Ember from 'ember';
import mainService from '../routes/main-service';

export default Ember.Component.extend(mainService, {
  id: '',
  search: '',
  isLinkProfileVisible: Ember.computed('auth.authentication', function () {
    this.debug(this.get("auth.authentication"));
    return this.get("auth.authentication");
  }),
  authenticate: Ember.observer("auth.authentication", function () {
    if (this.get("auth.authentication")) {
      this.toggleNav();
    }
  }),
  didInsertElement(){
    this._super(...arguments);
    this.debug(this);
  },
  toggleNav(){
    this.debug("nav change!");
    let id = this.commonService.getId();
    this.set('id', id);
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
