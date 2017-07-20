import Ember from 'ember';

export default Ember.Route.extend(Ember.Evented, {
  documentReady: false,
  authentication: false,
  onDocumentReady(){
    Ember.run.schedule('afterRender', this, function () {
      const context = this;
      Ember.$(".loading").animate({
        width: "100%"
      }, {
        duration: 500,
        specialEasing: {
          width: "linear"
        },
        complete: function () {
          Ember.$(this).css("width", "0%");
        }
      });

      this.trigger("onDocumentReady");
      this.set("documentReady", true);
      this.authService.auth(context.commonService.getToken()).then(function (response) {
        if (response.status === 204) {
          context.set("authentication", true);
        }
        if (response.status === 204) {
          Ember.$("li.login").addClass('hide');
          Ember.$("li.user").removeClass('hide');
          Ember.$("li.user a").attr("href", "/dashboard/" + context.commonService.getId());
        } else {
          Ember.$("li.login").removeClass('hide');
          Ember.$("li.user").addClass('hide');
        }
      });
    });
  },
  actions: {
    didTransition(){
      this.onDocumentReady();
    }
  }
});
