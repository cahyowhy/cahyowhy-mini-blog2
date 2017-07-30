import Ember from 'ember';
import BaseController from './base-controller';
import CommentPost from '../models/commentpost';
import Likecommentpost from '../entity/likecommentpost';
import Commentpost from '../entity/commentpost';

export default Ember.Controller.extend(BaseController, {
  commentDisabled: true,
  commentpost: Commentpost.create(),
  authentication: Ember.observer('applicationRoute.authentication', function () {
    if (this.get("applicationRoute.authentication")) {
      this.set("commentDisabled", false);
    }
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
    doSave(event){
      const context = this;
      if (this.checkBtnSaveDisabled(event)) {
        let commentpost = this.get('commentpost');
        commentpost.set('commentpost.post_id', this.get("post").id);
        commentpost.set('commentpost.user_id', this.commonService.getId());
        this.doSave("comment", commentpost).then(function (response) {
          context.get("comments").pushObject(response);
          context.emptyField();
        });
      }
    }
  }
});
