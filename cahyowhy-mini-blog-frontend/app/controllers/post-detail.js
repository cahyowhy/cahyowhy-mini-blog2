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
  authentication: Ember.observer('applicationRoute.authentication', function () {
    if (this.get("applicationRoute.authentication")) {
      this.set("commentDisabled", false);
    }
  }),
  isLoadCommentBtnDisplayed: Ember.computed("comments", function () {
    return this.get("comments") > 0
  }),
  username: Ember.computed('commonService', function () {
    return this.commonService.getUsername();
  }),
  isBtnDisabled: Ember.computed.empty("commentpost.commentpost.comment"),
  emptyField(){
    this.set("commentpost.commentpost.comment", "");
  },
  actions: {
    onFavouriteComment(id, param){
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
