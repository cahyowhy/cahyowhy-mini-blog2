import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    didTransition(){
      const context = this;
      Ember.run.schedule('afterRender', function () {
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
        context.authService.auth(context.commonService.getToken()).then(function (response) {
          if (response.status === 204) {
            Ember.$("li.login").addClass('hide');
            Ember.$("li.user").removeClass('hide');
            Ember.$("li.user a").attr("href", "/dashboard/" + context.commonService.getId());
          } else {
            Ember.$("li.login").removeClass('hide');
            Ember.$("li.user").addClass('hide');
          }

          if ((context.get("router.url") === "/post" || context.get("router.url") === "/post/") && response.status === 204) {
            Ember.$(".hearticon").removeClass('hide');
          } else {
            Ember.$(".hearticon").addClass('hide');
          }

          if (context.get("router.url").startsWith("/post-detail/") && response.status === 204) {
            Ember.$("li.list-group-item.comment-input").removeClass('hide');
            Ember.$(".hearticon").removeClass('hide');
          } else {
            Ember.$("li.list-group-item.comment-input").addClass('hide');
            Ember.$(".hearticon").addClass('hide');
          }
        });
      });
    }
  }
});
