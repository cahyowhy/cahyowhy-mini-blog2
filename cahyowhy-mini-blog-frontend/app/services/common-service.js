import Ember from 'ember';

export default Ember.Service.extend({
  localStorage: Ember.inject.service(),
  getToken(){
    return this.get('localStorage').getItem('user').auth_token
  },
  getId(){
    return this.get('localStorage').getItem('user').user.id;
  },
  getUsername(){
    return this.get('localStorage').getItem('user').user.username;
  }
});
