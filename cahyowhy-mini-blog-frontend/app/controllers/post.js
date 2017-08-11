import Ember from 'ember';
import BaseController from './base-controller';
import ENV from '../config/environment';
import offsetlimit from '../entity/offsetlimit';

let offset = 0;
export default Ember.Controller.extend(BaseController, {
  ifPostIsEmpty: false,
  actions: {
    onLoadPost(){
      const context = this;
      offset = offset + ENV.APP.DEFAULT_LIMIT;

      this.doFind("post", offsetlimit(offset)).then(function (response) {
        response.forEach(function (item) {
          context.get('posts').pushObject(item);
        });
        if (response.length === 0) {
          context.set("ifPostIsEmpty", true);
        }
      });
    }
  }
});
