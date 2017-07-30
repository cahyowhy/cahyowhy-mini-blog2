import Ember from 'ember';
import Post from '../../entity/post';
import offsetlimit from '../../entity/offsetlimit';

export default Ember.Route.extend({
  model(){
    let post = Post.create();
    post.set('post.user_id', this.modelFor('dashboard').id);
    post = post.getChildWithSelection(['user_id']);
    for (let key in offsetlimit()) {
      post[key] = offsetlimit()[key];
    }
    return Ember.RSVP.hash({
      posts: this.postService.find(post)
    })
  },
  setupController(controller, model){
    this.controllerFor('dashboard.post').set('posts', model.posts);
  }
});
