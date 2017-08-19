import Ember from 'ember';
import BaseController from '../base-controller';
import ENV from '../../config/environment';
import offsetlimit from '../../entity/offsetlimit';

let offset = 0;
export default Ember.Controller.extend(BaseController, {
  ifPostIsEmpty: Ember.computed('posts', function () {
    this.debug(this.get('posts').length);
    return this.get('posts').length === 0;
  }),
  posts: [],
  actions: {
    onLoadPost(){
      const context = this;
      offset = offset + ENV.APP.DEFAULT_LIMIT;
      const query = offsetlimit(offset);

      this.doFind("post", query).then(function (results) {
        results.forEach(function (item) {
          context.get('posts').pushObject(item);
        });
        context.set('ifPostIsEmpty', results.length === 0);
      });
    }
  }
});
