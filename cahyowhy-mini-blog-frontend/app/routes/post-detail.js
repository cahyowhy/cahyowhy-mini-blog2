import BaseRouter from './base';
import Ember from 'ember';
import ENV from '../config/environment';
import Commentpost from '../entity/commentpost';
import OffsetLimit from '../entity/offsetlimit';
import Likecommentpost from '../entity/likecommentpost';

const {computed, get} = Ember;
export default BaseRouter.extend({
  controller: null,
  commentpost: new Commentpost().getInitializeValue(),
  offset: ENV.APP.DEFAULT_OFFSET,
  /**
   * need for computed property
   */
  comments: null,
  model(param){
    let commentpost = new Commentpost().getInitializeValue();
    commentpost.commentpost.post_id = param.id;
    commentpost = new Commentpost().getChildValue(commentpost);
    let offsetlimit = OffsetLimit();
    this.offset = ENV.APP.DEFAULT_OFFSET;
    for (let key in offsetlimit) {
      commentpost[key] = offsetlimit[key];
    }

    return Ember.RSVP.hash({
      post: this.doFind("post", param.id),
      comments: this.doFind("comment", commentpost),
      nextPost: this.doFindPostNextById(param.id),
      prevPost: this.doFindPostPrevById(param.id),
      fbAPPID: ENV.APP.APP_FB_ID,
    })
  },
  hideArrow(param){
    Ember.$(`.${param}`).addClass('hide');
  },
  showArrow(param){
    Ember.$(`.${param}`).removeClass('hide');
  },
  afterRender(){
    this._super(...arguments);
    const nextPost = this.controller.get('nexPost');
    const prevPost = this.controller.get('prevPost');
    /**
     * sesuk jajal iso po ura
     * authentication seko base router
     */
    this.controller.set("commentDisabled", computed('authentication', () => {
      return !get(this, 'authentication');
    }));
    this.controller.set("isCommentEmpty", computed('comments', () => {
      return get(this, 'comments');
    }));
    this.controller.set("isBtnDisabled", computed.empty('commentpost.commentpost.comment'));
    this.controller.set("isLoadCommentBtnDisplayed", computed.gt('comments', 0));

    nextPost === null || nextPost === undefined ? this.hideArrow("post-right") : this.showArrow("post-right");
    prevPost === null || prevPost === undefined ? this.hideArrow("post-left") : this.showArrow("post-left");
  },
  // afterModel(model) {
  // this.set('headData.title', model.post.title);
  // this.set('headData.description', model.post.description);
  // this.set('headData.image', "http://lorempixel.com/210/210");
  // },
  setupController(controller, model){
    const imageProfile = this.commonService.getImageProfile();
    const username = this.commonService.getUsername();
    this.controller = controller;
    this.comments = model.comments;
    this.controller.set('comments', this.comments);
    this.controller.set('post', model.post);
    this.controller.set('nextPost', model.nextPost);
    this.controller.set('prevPost', model.prevPost);
    this.controller.set('fbAPPID', model.fbAPPID);
    this.controller.set('commentpost', this.commentpost);
    this.controller.set('imageProfile', imageProfile);
    this.controller.set('username', username);
  },
  actions: {
    onFavouriteComment(id){
      let likecommentpost = new Likecommentpost().getInitializeValue();
      likecommentpost.user_id = this.commonService.getId();
      likecommentpost.commentpost_id = id;
      likecommentpost.post_id = this.controller.get("post").id;
      likecommentpost = new Likecommentpost().getValue(likecommentpost);
      this.doSave("likecommentpost", likecommentpost).then();
    },
    onloadcomment(){
      this.offset = this.offset + ENV.APP.DEFAULT_LIMIT;
      const context = this;
      let commentpost = new Commentpost().getInitializeValue();
      commentpost.commentpost.post_id = param.id;
      commentpost = new Commentpost().getChildValue(commentpost);
      let offsetlimit = OffsetLimit(this.offset);

      for (let key in offsetlimit) {
        commentpost[key] = offsetlimit[key];
      }

      this.doFind("comment", commentpost).then(function (response) {
        response.forEach(function (item) {
          /**
           * carefull of this
           * check ng kantor!
           */
          context.controller.get('comments').pushObject(item);
          context.comments.pushObject(item);
        });
      })
    },
    doSave(event){
      const context = this;
      if (this.checkBtnSaveDisabled(event)) {
        let commentpost = this.controller.get('commentpost');
        commentpost.set('commentpost.post_id', this.controller.get("post").id);
        commentpost.set('commentpost.user_id', this.commonService.getId());

        /**
         *
         * also checked this
         */
        commentpost = new Commentpost().getValue(this.normalize(commentpost));
        this.doSave("comment", commentpost).then(function (response) {
          context.controller.get("comments").unshiftObject(response);
          context.controller.set("commentpost.commentpost.comment", "");
        });
      }
    }
  }
});
