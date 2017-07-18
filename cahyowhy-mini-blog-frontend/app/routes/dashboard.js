import Ember from 'ember';

export default Ember.Route.extend({
  model(param){
    return {id: param.id}
  },
  afterModel(model){
    const context = this;
    this.userService.findUserById(model.id).then().catch(function () {
      context.transitionTo('/not-found');
    })
  }
});
