import Ember from 'ember';
import ENV from '../../config/environment';
import BaseRouter from '../base';
import offsetlimit from '../../entity/offsetlimit';

export default BaseRouter.extend({
  offset: ENV.APP.DEFAULT_OFFSET,
  posts: [],
  controller: null,
  setupController(controller, model){
    this.controller = controller;
    this.posts = model.posts;
    this.controller.set('posts', this.posts);
  },
  afterReder(){
    this._super(...arguments);
    this.controller.set('ifPostIsEmpty', Ember.computed.equal('posts.length', 0));
  },
  model(){
    this.offset = ENV.APP.DEFAULT_OFFSET;
    return Ember.RSVP.hash({
      posts: this.doFind("post"),
    });
  },
  actions: {
    onLoadPost(){
      const context = this;
      this.offset = this.offset + ENV.APP.DEFAULT_LIMIT;
      const query = offsetlimit(this.offset);

      this.doFind("post", query).then(function (results) {
        results.forEach(function (item) {
          context.posts.pushObject(item);
          context.controller.get('posts').pushObject(item);
        });
        context.controller.set('ifPostIsEmpty', results.length === 0);
      });
    }
  }
});
