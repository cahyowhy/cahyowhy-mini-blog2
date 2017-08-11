import Ember from 'ember';
import BaseController from './base-controller';
import ENV from '../config/environment';
import offsetlimit from '../entity/offsetlimit';

let offset = 0;
export default Ember.Controller.extend(BaseController, {
  queryParams: ['token'],
  /**
   * ifPostIsEmpty checked
   * if user request the data and get response,
   * response.length===0
   * set true
   */
  ifPostIsEmpty: false,
  /**
   * check if status that we wrote
   * on create status component is empty
   * if false we can abort transition
   * when user accidentally click link to
   */
  ifCreateStatusEmpty: true,
  token: null,
  actions: {
    checkStatusEmpty(params){
      this.debug(params);
      this.set('ifCreateStatusEmpty', params);
    },
    onLoadStatuses(){
      const context = this;
      offset = offset + ENV.APP.DEFAULT_LIMIT;

      this.doFind("timeline", offsetlimit(offset)).then(function (response) {
        response.forEach(function (item) {
          context.get('statuses').pushObject(item);
        });

        response.length == 0 ? context.set('ifPostIsEmpty', true) : context.set('ifPostIsEmpty', false);
      });
    }
  }
});
