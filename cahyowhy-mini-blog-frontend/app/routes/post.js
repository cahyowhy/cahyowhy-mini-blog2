import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
      posts: null
    })
  },
  setupController(controller, model){
    this.controllerFor('post').set('posts', model.posts);
  },
  afterModel(model){
    const context = this;
    Ember.run.schedule('afterRender', function () {
      context.controllerFor('post').setPost();
    });
  }
});
