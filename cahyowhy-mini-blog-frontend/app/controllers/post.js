import Ember from 'ember';
import BaseController from './base-controller';
import ENV from '../config/environment';
import offsetlimit from '../entity/offsetlimit';

let offset = 0;
export default Ember.Controller.extend(BaseController, {
  ifPostIsEmpty: false,
  queryParams: ['category'],
  category: null,
  posts: [],
  run(){
    const query = {
      offset: ENV.APP.DEFAULT_OFFSET,
      limit: ENV.APP.DEFAULT_LIMIT
    };

    const request = this.doFind('post', query);
    this.doRequest(request);
  },
  onChangeCategory: Ember.observer('category', function () {
    this.set('posts', []);
    this.debug(this.get("category"));
    const category = this.get("category");
    const query = category !== null && category !== undefined ? {
      offset: ENV.APP.DEFAULT_OFFSET,
      limit: ENV.APP.DEFAULT_LIMIT,
      category: category
    } : {
      offset: ENV.APP.DEFAULT_OFFSET,
      limit: ENV.APP.DEFAULT_LIMIT
    };
    const request = this.doFind('post', query);
    this.doRequest(request);
  }),
  doRequest(promise){
    const context = this;
    promise.then(function (results) {
      results.length === 0 ? context.set("ifPostIsEmpty", true) : context.set("ifPostIsEmpty", false);
      context.set("posts", results);
    });
  },
  actions: {
    onLoadPost(){
      const context = this;
      offset = offset + ENV.APP.DEFAULT_LIMIT;
      const category = this.get("category");
      let query;
      if (category !== null && category !== undefined) {
        query = {category: category};
        for (let key in offsetlimit(offset)) {
          query[key] = offsetlimit(offset)[key];
        }
      } else {
        query = offsetlimit(offset);
      }

      this.doFind("post", query).then(function (results) {
        results.forEach(function (item) {
          context.get('posts').pushObject(item);
        });
        results.length === 0 ? context.set("ifPostIsEmpty", true) : context.set("ifPostIsEmpty", false);
      });
    }
  }
});
