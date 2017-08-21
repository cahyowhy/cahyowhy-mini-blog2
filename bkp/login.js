import Ember from 'ember';
import BaseController from './base-controller';
import User from '../entity/user';

export default Ember.Controller.extend(BaseController, {
  user: User.create(),
  btnDisabled: Ember.computed('user.user.username', 'user.user.password', function () {
    return this.get("user.user.username").length === 0 || this.get("user.user.password").length === 0;
  }),
  actions: {
    onLogin(event){
      const context = this;
      let user = this.get('user');
      if (this.checkBtnSaveDisabled(event)) {
        this.doSave("login", user.getChild()).then(function (response) {
          context.commonService.setCookies(response);
          context.transitionToRoute('dashboard', response.user.id);
        }).catch(function (err) {
          context.debug(err);
        });
      }
    },
    onLoginFacebook(){
      const context = this;
      window.FB.login(function (response) {
        if (response.authResponse) {
          window.FB.api('/me', {fields: 'email,id,name,picture.width(2048),birthday'},
            function (result) {
              // let user = context.get('user');
              // user.set('facebook_id', result.id);
              // user = user.getChildWithSelection(['facebook_id']);
              // context.debug(result);
              // context.debug(user);
              const user = {
                facebook_id: parseInt(result.id)
              };
              context.doSave("login", user, "facebook").then(function (response) {
                if (response.httpstatus !== 404) {
                  context.commonService.setCookies(response);
                  context.transitionToRoute('dashboard', response.user.id);
                } else {
                  context.transitionToRoute('sign-up', {queryParams: {facebook_id: parseInt(result.id)}});
                }
              }).catch(function (err) {
                context.debug(err);
              });
            });
        } else {
          context.debug('User cancelled login or did not fully authorize.');
        }
      }, {scope: 'public_profile,email'});
    }
  }
});
