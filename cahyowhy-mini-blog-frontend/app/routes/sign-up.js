import Ember from 'ember';
import BaseRouter from './base';
import User from '../entity/user';

const {computed, get} = Ember;
export default BaseRouter.extend({
  controller: null,
  facebook_id: null,
  user: new User().getInitializeValue(),
  isUserFailFbLogin: false,
  passwordConfirmation: '',
  beforeModel(transition){
    if (transition.queryParams.facebook_id !== undefined && transition.queryParams.facebook_id !== null) {
      this.facebook_id = parseInt(transition.queryParams.facebook_id);
      this.isUserFailFbLogin = true;
    }
  },

  afterRender(){
    this._super(...arguments);
    const allProperty = ['passwordConfirmation', 'user.user.password',
      'user.user.username', 'user.user.name', 'user.user.email'];
    /**
     * since i did'nt know to solve this
     * ill keep this shit separate
     * to make 1btn disabled/not
     */
    this.controller.set('isAllPropertyPresent', computed.allPresent(allProperty));
    this.controller.set('signUpRule', computed(
      'user.user.password', 'user.user.email',
      'passwordConfirmation', function () {
        const isPasswordEqual = get(this, 'user.user.password') === get(this, 'passwordConfirmation');
        const isEmailFormated = /^.+@.+\..+$/.test(get(this, 'user.user.email'));
        const isPasswordLengthGte8 = get(this, 'user.user.password').length >= 8;

        return isEmailFormated && isPasswordLengthGte8 && isPasswordEqual;
      }));

    if (this.controller.get('isUserFailFbLogin')) {
      const context = this;
      window.FB.api(`/${this.get('facebook_id')}`, {fields: 'email,id,name,picture.width(2048),birthday'},
        function (response) {
          let user = context.get('user');
          user.set('user.name', response.name);
          user.set('user.imageurl', response.picture.data.url);
          user.set('user.facebook_id', context.get('facebook_id'));
        });
    }
  },
  model(){
    this.debug(this.facebook_id);
    return {
      facebook_id: this.facebook_id,
      isUserFailFbLogin: this.isUserFailFbLogin
    };
  },
  setupController(controller, model){
    this.controller = controller;
    this.controller.set('facebook_id', this.facebook_id);
    this.controller.set('user', this.user);
    this.controller.set('passwordConfirmation', this.passwordConfirmation);
    this.controller.set('isUserFailFbLogin', model.isUserFailFbLogin);
  },
  actions: {
    doSave(event){
      const context = this;
      let user = new User().getValue(this.controller.get('user'));
      if (this.checkBtnSaveDisabled(event)) {
        this.doSave("user", user).then(function (response) {
          context.transitionToRoute('login');
        });
      }
    }
  }
});

