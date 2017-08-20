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
  afterRender(){
    this._super(...arguments);
    if (this.get('isUserFailFbLogin')) {
      window.FB.api(`/${this.get('facebook_id')}`, {fields: 'email,id,name,picture.width(2048),birthday'},
        function (response) {
          let user = this.get('user');
          user.set('user.name', response.name);
          user.set('user.imageurl', response.picture.data.url);
          user.set('user.facebook_id', response.id);
        });
    }
  },
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
