import Ember from 'ember';
import BaseController from './base-controller';
import offsetlimit from '../entity/offsetlimit';
import ENV from '../config/environment';

let offset = 0;
export default Ember.Controller.extend(BaseController, {
  queryParams: ['search', 'type'],
  search: "",
  type: "",
  results: [],
  onChangeSearchType: Ember.observer('search', 'type', function () {
    const search = this.get('search');
    const type = this.get('type');
    const query = {
      offset: ENV.APP.DEFAULT_OFFSET,
      limit: ENV.APP.DEFAULT_LIMIT,
      query: search
    };
    const request = type === "status" ? this.doFind("status", query) : type === "post" ? this.doFind("post", query) : this.doFind("user", query);
    this.doRequest(request);
  }),
  doRequest(promise){
    const context = this;
    promise.then(function (results) {
      context.set('results', results);
    });
  },
  ifPostIsEmpty: false,
  actions: {
    onLoadResult(){
      const context = this;
      offset = offset + ENV.APP.DEFAULT_LIMIT;
      let query = {query: this.get('search')};
      for (let key in offsetlimit(offset)) {
        query[key] = offsetlimit(offset)[key];
      }

      const type = this.get('type').length == 0 ? "user" : this.get("type");
      this.doFind(type, query).then(function (response) {
        response.forEach(function (item) {
          context.get('results').pushObject(item);
        });
        if (response.length === 0) {
          context.set("ifPostIsEmpty", true);
        }
      });
    }
  }
});
