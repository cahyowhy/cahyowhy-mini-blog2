import Ember from 'ember';
import BaseController from './base-controller';
import Login from '../models/userlogin';

export default Ember.Controller.extend(BaseController, {
  username: '',
  password: '',
  btnDisabled: Ember.computed('username', 'password', function () {
    return this.get("username").length === 0 || this.get("password").length === 0;
  }),
  onObjectChange: Ember.observer('username', 'password', function () {
    Login.username = this.get("username");
    Login.password = this.get("password");
  }),
  actions: {
    doSave(event){
      const context = this;
      if (this.checkBtnSaveDisabled(event)) {
        this.debug(Login);
        this.doSave("login", Login).then(function (response) {
          context.localStorage.setItem('user', response);
          context.transitionToRoute('dashboard', response.user.id);
        }).catch(function (err) {
          context.debug(err);
        });
      }
    }
  }
});
