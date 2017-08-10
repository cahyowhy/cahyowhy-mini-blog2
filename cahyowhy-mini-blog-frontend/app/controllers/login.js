import Ember from 'ember';
import BaseController from './base-controller';
import User from '../entity/user';

export default Ember.Controller.extend(BaseController, {
  user: User.create(),
  btnDisabled: Ember.computed('user.user.username', 'user.user.password', function () {
    return this.get("user.user.username").length === 0 || this.get("user.user.password").length === 0;
  }),
  actions: {
    doSave(event){
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
    }
  }
});
