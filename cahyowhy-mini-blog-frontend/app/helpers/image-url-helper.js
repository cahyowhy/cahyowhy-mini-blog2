import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Helper.extend({
  compute(params) {
    return ENV.APP.API_URL + params;
  }
});
