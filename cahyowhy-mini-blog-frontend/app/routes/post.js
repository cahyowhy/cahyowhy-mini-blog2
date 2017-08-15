import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition){
    if (transition.queryParams.category === null || transition.queryParams.category === undefined || transition.queryParams.category.length === 0) {
      this.controllerFor('post').run();
    }
  },
  actions:{
    willTransition(){
      this.controllerFor('post').disableScrollBar();
    }
  }
});
