import Ember from 'ember';
import Post from '../../entity/post';
import offsetlimit from '../../entity/offsetlimit';
import BaseRouter from '../base';
import ENV from '../../config/environment';

export default BaseRouter.extend({
  offset: ENV.APP.DEFAULT_OFFSET,
  controller: null,
  posts: null,
  model(){
    this.offset = ENV.APP.DEFAULT_OFFSET;
    let post = new Post().getInitializeValue();
    post.post.user_id = this.modelFor('dashboard').id;
    post = new Post().getChildValue(post);
    for (let key in offsetlimit()) {
      post[key] = offsetlimit()[key];
    }

    return Ember.RSVP.hash({
      isLogedIn: this.modelFor('dashboard').isLogedIn,
      posts: this.postService.find(post)
    })
  },
  afterRender(){
    this._super(...arguments);
    this.controller.set('ifPostIsEmpty', Ember.computed.equal('posts.length'), 0);
  },
  setupController(controller, model){
    this.controller = controller;
    this.posts = model.posts;
    this.controller.set('token', this.commonService.getToken());
    this.controller.set('userId', this.commonService.getId());
    this.controller.set('posts', this.posts);
    this.controller.set('isLogedIn', model.isLogedIn);
  },
  actions: {
    onLoadPost(){
      const context = this;
      this.offset = this.offset + ENV.APP.DEFAULT_LIMIT;

      let post = new Post().getInitializeValue();
      post.post.user_id = this.commonService.getId();
      post = new Post().getChildValue(post);
      for (let key in offsetlimit(this.offset)) {
        post[key] = offsetlimit(this.offset)[key];
      }

      this.doFind("post", post).then(function (response) {
        response.forEach(function (item) {
          context.controller.get('posts').pushObject(item);
        });
        if (response.length === 0) {
          context.controller.set("ifPostIsEmpty", true);
        }
      });
    }
  }
});
