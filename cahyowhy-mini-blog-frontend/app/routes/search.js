import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition){
    this.debug(transition.queryParams);
  }
});
