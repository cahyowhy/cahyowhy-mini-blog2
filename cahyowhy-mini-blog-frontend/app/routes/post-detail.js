import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  model(param){
    return Ember.RSVP.hash({
      post: this.postService.findPostById(param.id),
      comments: this.commentpostService.findCommentPostByPostid(param.id),
      nextPost: this.postService.findPostNextById(param.id),
      prevPost: this.postService.findPostPrevById(param.id),
      fbAPPID: ENV.APP.APP_FB_ID
    })
  },
  afterModel(model) {
    this.set('headData.title', model.post.title);
    this.set('headData.description', model.post.description);
    this.set('headData.image', "http://lorempixel.com/210/210");

    const context = this;
    if (model.nextPost === null || model.nextPost === undefined) {
      this.hideArrow("post-right");
    } else {
      this.showArrow("post-right");
    }

    if (model.prevPost === null || model.prevPost === undefined) {
      this.hideArrow("post-left");
    } else {
      this.showArrow("post-left");
    }
  },
  hideArrow(param){
    Ember.run.schedule("afterRender", function () {
      Ember.$(`.${param}`).addClass('hide');
    });
  },
  showArrow(param){
    Ember.run.schedule("afterRender", function () {
      Ember.$(`.${param}`).removeClass('hide');
    });
  },
  setupController(controller, model){
    this.controllerFor('post-detail').set('post', model.post);
    this.controllerFor('post-detail').set('comments', model.comments);
    this.controllerFor('post-detail').set('nextPost', model.nextPost);
    this.controllerFor('post-detail').set('prevPost', model.prevPost);
    this.controllerFor('post-detail').set('fbAPPID', model.fbAPPID);
  }
});
