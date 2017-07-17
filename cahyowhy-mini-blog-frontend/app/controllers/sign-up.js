import Ember from 'ember';
import User from '../models/user';
import BaseController from './base-controller';

export default Ember.Controller.extend(BaseController, {
  name: "",
  username: "",
  password: "",
  passwordConfirmation: "",
  btnDisable: Ember.computed.empty('passwordConfirmation', 'password', 'username', 'name') && Ember.computed("password", "passwordConfirmation", function () {
    let password = this.get("password"), confirmPwd = this.get("passwordConfirmation");
    return !((password === confirmPwd) && (password.length >= 8));
  }),
  onObjectChange: Ember.observer('name', 'username', 'password', function () {
    User.name = this.get("name");
    User.username = this.get("username");
    User.password = this.get("password");
  }),
  actions: {
    doSave(event){
      const context = this;
      if (this.checkBtnSaveDisabled(event)) {
        this.doSave("user", User).then(function (response) {
          context.transitionToRoute('login');
        });
      }
    }
  }
});
