import Ember from 'ember';
import BaseController from '../base-controller';
import User from '../../entity/user';

export default Ember.Controller.extend(BaseController, {
  user: User.create(),
  newPassword: '',
  newPasswordConfirmation: '',
  isPasswordEdit: false,
  ifPasswordMatch: Ember.computed('newPassword', 'newPasswordConfirmation', function () {
    return !(this.get('newPassword') === this.get('newPasswordConfirmation') && this.get('newPassword').length > 7 && this.get('newPasswordConfirmation').length > 7)
  }),
  actions: {
    onEditPassword(){
      this.set('isPasswordEdit', !this.get('isPasswordEdit'));
    },
    onUpdateUser(event){
      let user = this.get('user');
      if (this.checkBtnSaveDisabled(event)) {
        this.doUpdate('user', user.getChildWithSelection(['username', 'name'])).then(function () {
          window.location.reload();
        });
      }
    },
    onUpdatePassword(event){
      if (this.checkBtnSaveDisabled(event)) {
        let user = User.create();
        user.set("user.username", this.commonService.getUsername());
        user.set("user.password", this.get('user.user.password'));
        const context = this;
        this.doSave("login", user.getChildWithSelection(['username', 'password'])).then(function (response) {
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
