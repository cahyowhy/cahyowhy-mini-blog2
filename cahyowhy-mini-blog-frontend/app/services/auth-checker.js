import Ember from 'ember';

const {set} = Ember;
export default Ember.Service.extend({
  authentication: false,
  init(){
    this._super(...arguments);
  },
  setAuth(param){
    set(this, 'authentication', param);
  }
});
