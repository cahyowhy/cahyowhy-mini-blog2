import Ember from 'ember';
import BaseRouter from '../base';
import User from '../../entity/user';

const {get, computed} = Ember;
export default BaseRouter.extend({
  controller: null,
  newPassword: null,
  newPasswordConfirmation: null,
  user: new User().getInitializeValue(),
  setupController(controller){
    this.controller = controller;
    this.controller.set('newPassword', '');
    this.controller.set('user', this.user);
    this.controller.set('newPasswordConfirmation', '');
    this.controller.set('ifPasswordMatch', computed('newPassword', 'newPasswordConfirmation', function () {
      return !(get(this, 'newPassword') === get(this, 'newPasswordConfirmation') &&
      get(this, 'newPassword').length > 7 && get(this, 'newPasswordConfirmation').length > 7);
    }));
  },
  actions: {
    onEditPassword(){
      this.controller.set('isPasswordEdit', !this.controller.get('isPasswordEdit'));
    },
    onUpdateUser(event){
      let user = this.controller.get('user');
      if (this.checkBtnSaveDisabled(event)) {
        this.doUpdate('user', user.getChildWithSelection(['username', 'name'])).then(function () {
          window.location.reload();
        });
      }
    },
    onUpdatePassword(event){
      if (this.checkBtnSaveDisabled(event)) {
        const context = this;
        let user = new User().getInitializeValue();
        user.user.username = this.commonService.getUsername();
        user.user.password = this.controller.get('user.user.password');
        user = new User().getChildValue(user);

        this.doSave("login", user).then(function (response) {
          if (response.httpstatus !== 404) {
            context.doUpdate('user', user.select(['password'])).then(function () {
              window.location.reload();
            });
          }
        }).catch(function (err) {
          context.debug(err);
        });
      }
    }
  }
});
