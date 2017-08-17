import Ember from 'ember';
import ENV from '../config/environment';
import Commentpost from '../entity/commentpost';
import OffsetLimit from '../entity/offsetlimit';

export default Ember.Route.extend({
  model(param){
    let commentpost = Commentpost.create();
    let offsetlimit = OffsetLimit();
    commentpost.set('commentpost.post_id', param.id);
    for (let key in offsetlimit) {
      commentpost.set(`commentpost.${key}`, offsetlimit[key]);
    }

    return Ember.RSVP.hash({
      post: this.postService.find(param.id),
      comments: this.commentpostService.find(commentpost.getChildWithSelection(['post_id', 'offset', 'limit'])),
      nextPost: this.postService.findPostNextById(param.id),
      prevPost: this.postService.findPostPrevById(param.id),
      fbAPPID: ENV.APP.APP_FB_ID,
    })
  },
  afterModel(model) {
    // this.set('headData.title', model.post.title);
    // this.set('headData.description', model.post.description);
    // this.set('headData.image', "http://lorempixel.com/210/210");
    model.nextPost === null || model.nextPost === undefined ? this.hideArrow("post-right") : this.showArrow("post-right");
    model.prevPost === null || model.prevPost === undefined ? this.hideArrow("post-left") : this.showArrow("post-left");
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
