import Ember from 'ember';

export default Ember.Component.extend({
  authentication: Ember.observer("applicationRoute.authentication", function () {
    if (this.get("applicationRoute.authentication")) {
      this.replaceLoginNavigation();
    } else {
      this.replaceProfileNavigation();
    }
  }),
  replaceLoginNavigation(){
    Ember.$("li.login").addClass('hide');
    Ember.$("li.user").removeClass('hide');
    Ember.$("li.user a").attr("href", "/dashboard/" + this.commonService.getId());
  },
  replaceProfileNavigation(){
    Ember.$("li.login").removeClass('hide');
    Ember.$("li.user").addClass('hide');
  }
});
