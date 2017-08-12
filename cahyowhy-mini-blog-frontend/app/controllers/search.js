import Ember from 'ember';
import BaseController from './base-controller';

export default Ember.Controller.extend(BaseController, {
  queryParams: ['search', 'type'],
  search: "",
  type: "",
  results: [],
  resultPromise: Ember.observer('search', 'type', function () {
    const search = this.get("search");
    const type = this.get("type");
    const results = type.length === 0 && search.length !== 0 ? this.doFind("user", {query: search}) :
      type === "post" && search.length !== 0 ? this.doFind("post", {query: search}) :
        type === "status" && search.length !== 0 ? this.doFind("status", {query: search}) : [];

    this.doFindResult(results);
  }),
  doFindResult(param){
    const context = this;
    if (typeof param.then === 'function') {
      param.then(function (response) {
        context.set('results', response);
      });
    }
  },
});
