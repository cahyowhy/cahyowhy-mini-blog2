import Ember from 'ember';

export default Ember.Route.extend({
  /**
   * need for an injection
   * in all component
   */
  authentication: false,
  beforeModel(){
    const context = this;
    if (this.commonService.getToken() === null || this.commonService.getToken() === undefined) {
      this.authentication = false;
    } else {
      this.authService.auth(context.commonService.getToken()).then(function (response) {
        context.authentication = response.status === 204;
      });
    }
  }
});
