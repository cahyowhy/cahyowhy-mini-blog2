import Ember from 'ember';

export default Ember.Route.extend(Ember.Evented, {
  documentReady: false,
  authentication: false,
  onDocumentReady(){
    Ember.run.schedule('afterRender', this, function () {
      const context = this;
      this.trigger("onDocumentReady");
      this.set("documentReady", true);
      if (this.commonService.getToken() === null || this.commonService.getToken() === undefined) {
        context.set("authentication", false);
      } else {
        this.authService.auth(context.commonService.getToken()).then(function (response) {
          if (response.status === 204) {
            context.set("authentication", true);
          } else {
            context.set("authentication", false);
          }
        });
      }
    });
  },
  actions: {
    didTransition(){
      this.onDocumentReady();
    }
  }
});
