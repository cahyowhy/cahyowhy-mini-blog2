import Ember from 'ember';
import ENV from '../../config/environment'

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
      posts: null
    })
  },
  setupController(controller, model){
    this.controllerFor('dashboard.index').set('posts', model.posts);
  },
  afterModel(model){
    const context = this;
    Ember.run.schedule('afterRender', function () {
      context.controllerFor('dashboard.index').setPost();
    });
  }
});
