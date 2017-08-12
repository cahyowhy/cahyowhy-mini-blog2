import Ember from 'ember';
import Offsetlimit from '../entity/offsetlimit';

export default Ember.Route.extend({
  beforeModel(transition){
    if (transition.queryParams.search === null || transition.queryParams.search === undefined || transition.queryParams.search.length === 0) {
      window.location.href = "/not-found";
    }
  }
});
