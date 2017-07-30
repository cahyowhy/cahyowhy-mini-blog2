import Ember from 'ember';
import offsetlimit from '../entity/offsetlimit';

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
      posts: this.postService.find(offsetlimit())
    })
  },
  setupController(controller, model){
    this.controllerFor('post').set('posts', model.posts);
  },
  afterModel(model){
    const context = this;
  }
});
