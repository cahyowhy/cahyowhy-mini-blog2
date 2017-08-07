import Ember from 'ember';
import BaseController from './base-controller';
import ENV from '../config/environment';
import offsetlimit from '../entity/offsetlimit';

let offset = 0;
export default Ember.Controller.extend(BaseController, {
  queryParams: ['token'],
  token: null,
  actions: {
    onLoadStatuses(){
      const context = this;
      offset = offset + ENV.APP.DEFAULT_LIMIT;

      this.doFind("timeline", offsetlimit(offset)).then(function (response) {
        response.forEach(function (item) {
          context.get('statuses').unshiftObject(item);
        });
      });
    }
  }
});
