import Ember from 'ember';
import User from '../entity/user';
import BaseController from './base-controller';


export default Ember.Controller.extend(BaseController, {
  user: User.create(),
  passwordConfirmation: "",
  btnDisable: Ember.computed.empty('passwordConfirmation', 'user.user.password', 'user.user.username', 'user.user.name') &&
  Ember.computed("user.user.password", "passwordConfirmation", function () {
    let password = this.get("user.user.password"), confirmPwd = this.get("passwordConfirmation");
    return !((password === confirmPwd) && (password.length >= 8));
  }),
  actions: {
    doSave(event){
      const context = this;
      let user = this.get('user');
      if (this.checkBtnSaveDisabled(event)) {
        this.doSave("user", user).then(function (response) {
          context.transitionToRoute('login');
        });
      }
    }
  }
});
