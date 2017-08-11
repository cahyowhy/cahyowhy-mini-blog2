import Ember from 'ember';
import offsetlimit from '../../entity/offsetlimit';
import BaseController from '../base-controller';
import Status from '../../entity/status';
import ENV from '../../config/environment';

let offset = 0;
export default Ember.Controller.extend(BaseController, {
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
  actions: {
    checkStatusEmpty(params){
      this.debug(params);
      this.set('ifCreateStatusEmpty', params);
    },
    onLoadStatuses(){
      const context = this;
      let id = this.get("id");
      let status = Status.create();
      status.set('status.user_id', id);
      status = status.getChildWithSelection(['user_id']);
      offset = offset + ENV.APP.DEFAULT_LIMIT;
      for (let key in offsetlimit(offset)) {
        status[key] = offsetlimit(offset)[key];
      }

      this.doFind("status", status).then(function (response) {
        response.forEach(function (item) {
          context.get('statuses').pushObject(item);
        });

        response.length == 0 ? context.set('ifPostIsEmpty', true) : context.set('ifPostIsEmpty', false);
      });
    }
  }
});
