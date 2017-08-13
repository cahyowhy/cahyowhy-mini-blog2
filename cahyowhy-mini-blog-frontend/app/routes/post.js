import Ember from 'ember';
import offsetlimit from '../entity/offsetlimit';

export default Ember.Route.extend({
  beforeModel(transition){
    if (transition.queryParams.category === null || transition.queryParams.category === undefined || transition.queryParams.category.length === 0) {
      this.controllerFor('post').run();
    }
  }
});
