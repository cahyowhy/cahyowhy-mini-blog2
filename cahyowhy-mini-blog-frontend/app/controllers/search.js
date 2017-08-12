import Ember from 'ember';
import BaseController from './base-controller';

export default Ember.Controller.extend(BaseController, {
  queryParams: ['search', 'type'],
  search: "",
  type: "",
  results: Ember.computed('search', 'type', function () {
    const search = this.get("search");
    const type = this.get("type");

    
  })
});
