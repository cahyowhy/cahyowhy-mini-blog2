import Ember from 'ember';
import BaseRouter from './base';
import User from '../entity/user';

export default BaseRouter.extend({
  controller: null,
  setupController(controller){
    this.controller = controller;
    let user = new User().getInitializeValue();
    this.controller.set('user', user);
    this.controller.set('btnDisabled', false);
    this.debug(this.controller.get('user'));
  },
  actions: {
    onLogin(event){
      const context = this;
      let user = new User().getChildValue(this.controller.get('user'));
      if (this.checkBtnSaveDisabled(event)) {
        this.doSave("login", user).then(function (response) {
          context.commonService.setCookies(response);
          // context.transitionToRoute('dashboard', response.user.id);
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
              context.controller.set('user.user.facebook_id', parseInt(result.id));
              const user = new User().getChildValue(context.controller.get('user'));

              context.doSave("login", user, "facebook").then(function (response) {
                if (response.httpstatus !== 404) {
                  context.commonService.setCookies(response);
                  // context.transitionToRoute('dashboard', response.user.id);
                } else {
                  // context.transitionToRoute('sign-up', {queryParams: {facebook_id: parseInt(result.id)}});
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
