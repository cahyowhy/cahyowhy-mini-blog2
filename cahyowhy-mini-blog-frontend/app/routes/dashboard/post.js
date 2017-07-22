import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
      posts: this.postService.findPostByUserid(this.modelFor('dashboard').id)
    })
  },
  setupController(controller, model){
    this.controllerFor('dashboard.post').set('posts', model.posts);
  }
});
