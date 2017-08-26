import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Helper.extend({
  compute(params) {
    if (params[0] !== null) {
      const condition = params[0].includes("scontent.xx.fbcdn") || params[0].includes("facebook");
      return condition ? params[0] : ENV.APP.IMAGE_RESOURCES + params[0];
    }
  }
});
