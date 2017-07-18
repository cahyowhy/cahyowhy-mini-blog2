import Ember from 'ember';

export default Ember.Route.extend({
  active(){
    const context = this;
    Ember.run.schedule('afterRender', this, function () {
      alert(context.commonService.getToken())
    });
  },
  actions: {
    didTransition(){
      const context = this;
      Ember.run.schedule('afterRender', function () {
        context.authService.auth(context.commonService.getToken()).then(function (response) {
          if (response.status === 204) {
            Ember.$("li.login").addClass('hide');
            Ember.$("li.user").removeClass('hide');
            Ember.$("li.user a").attr("href", "/dashboard/" + context.commonService.getId());
          } else {
            Ember.$("li.login").removeClass('hide');
            Ember.$("li.user").addClass('hide');
          }

          if (context.get("router.url").startsWith("/post-detail/") && response.status == 204) {
            Ember.$("li.list-group-item.comment-input").removeClass('hide');
          } else {
            Ember.$("li.list-group-item.comment-input").addClass('hide');
          }

          Ember.run.later(function () {
            Ember.$(".loading").css("width", "50%");
          }, 50);
          Ember.run.later(function () {
            Ember.$(".loading").css("width", "100%");
          }, 100);
          Ember.run.later(function () {
            Ember.$(".loading").css("width", "0%");
          }, 200);
        });
      });
    }
  }
});
