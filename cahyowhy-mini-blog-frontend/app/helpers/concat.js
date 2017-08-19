/**
 * Created by cahyo on 7/21/2017.
 */
import Ember from 'ember';
/**
 * return length from an array
 * @param param
 */
export default Ember.Helper.extend({
  compute(params) {
    if (params[0] !== undefined && params[1] !== undefined) {
      return params[0].toString()+params[1].toString();
    } else {
      return params[0] === undefined;
    }
  }
});
