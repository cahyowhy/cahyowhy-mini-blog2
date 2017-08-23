import Ember from 'ember';
import BaseController from './base-controller';
import Likecommentpost from '../entity/likecommentpost';
import Commentpost from '../entity/commentpost';
import Offsetlimit from '../entity/offsetlimit';
import ENV from '../config/environment';

let offset = 0;
export default Ember.Controller.extend(BaseController, {
  commentDisabled: true,
  commentpost: Commentpost.create(),
  isCommentEmpty: Ember.computed('comments', function () {
    return this.get('comments').length === 0;
  }),
  authentication: Ember.observer('applicationRoute.authentication', function () {
    if (this.get("applicationRoute.authentication")) {
      this.set("commentDisabled", false);
    }
  }),
  afterRender(){
    this._super(...arguments);
    const nextPost = this.get('nexPost');
    const prevPost = this.get('prevPost');
    nextPost === null || nextPost === undefined ? this.hideArrow("post-right") : this.showArrow("post-right");
    prevPost === null || prevPost === undefined ? this.hideArrow("post-left") : this.showArrow("post-left");
  },
  hideArrow(param){
    Ember.$(`.${param}`).addClass('hide');
  },
  showArrow(param){
    Ember.$(`.${param}`).removeClass('hide');
  },
  isLoadCommentBtnDisplayed: Ember.computed("comments", function () {
    return this.get("comments") > 0
  }),
  imageProfile: Ember.computed('commonService', function () {
    return this.commonService.getImageProfile();
  }),
  username: Ember.computed('commonService', function () {
    return this.commonService.getUsername();
  }),
  isBtnDisabled: Ember.computed.empty("commentpost.commentpost.comment"),
  emptyField(){
    this.set("commentpost.commentpost.comment", "");
  },
  actions: {
    onFavouriteComment(id){
      let likecommentpost = Likecommentpost.create();
      likecommentpost.set('likecommentpost.user_id', this.commonService.getId());
      likecommentpost.set('likecommentpost.commentpost_id', id);
      likecommentpost.set('likecommentpost.post_id', this.get("post").id);
      this.doSave("likecommentpost", likecommentpost.getChild()).then();
    },
    onloadcomment(){
      offset = offset + ENV.APP.DEFAULT_LIMIT;
      const context = this;
      let commentpost = Commentpost.create();
      let offsetlimit = Offsetlimit(offset);
      commentpost.set('commentpost.post_id', this.get("post").id);
      for (let key in offsetlimit) {
        commentpost.set(`commentpost.${key}`, offsetlimit[key]);
      }

      this.commentpostService.find(commentpost.getChildWithSelection(['post_id', 'offset', 'limit'])).then(function (response) {
        response.forEach(function (item) {
          context.get('comments').pushObject(item);
        });
      })
    },
    doSave(event){
      const context = this;
      if (this.checkBtnSaveDisabled(event)) {
        let commentpost = this.get('commentpost');
        commentpost.set('commentpost.post_id', this.get("post").id);
        commentpost.set('commentpost.user_id', this.commonService.getId());
        this.doSave("comment", commentpost).then(function (response) {
          context.get("comments").unshiftObject(response);
          context.emptyField();
        });
      }
    }
  }
});
