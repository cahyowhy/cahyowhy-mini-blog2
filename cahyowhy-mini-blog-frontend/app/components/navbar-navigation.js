import Ember from 'ember';

export default Ember.Component.extend({
  id: '',
  isLinkProfileVisible: false,
  authentication: Ember.observer("applicationRoute.authentication", function () {
    if (this.get("applicationRoute.authentication")) {
      this.toggleNav();
    }
  }),
  toggleNav(){
    this.debug("nav change!");
    let id = this.commonService.getId();
    this.set('id', id);
    this.set('isLinkProfileVisible', true);
  }
});
