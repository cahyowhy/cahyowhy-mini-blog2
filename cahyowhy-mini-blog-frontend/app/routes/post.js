import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
      posts: this.postService.findAllPost()
    })
  },
  setupController(controller, model){
    this.controllerFor('post').set('posts', model.posts);
  },
  afterModel(model){
    const context = this;
  }
});
