import Ember from 'ember';
import BaseController from './base-controller';
import CommentPost from '../models/commentpost';
import Likecommentpost from '../models/likecommentpost';

export default Ember.Controller.extend(BaseController, {
  username: Ember.computed('commonService', function () {
    return this.commonService.getUsername();
  }),
  onObjectChange: Ember.observer("comment", function () {
    CommentPost.comment = this.get("comment");
  }),
  comment: "",
  isBtnDisabled: Ember.computed.empty("comment"),
  emptyField(){
    this.set("comment", "");
  },
  actions: {
    onFavouriteComment(id, param){
      Likecommentpost.user_id = this.commonService.getId();
      Likecommentpost.post_id = this.get("post").id;
      Likecommentpost.commentpost_id = id;
      this.doSave("likecomment", Likecommentpost).then();
    },
    doSave(event){
      const context = this;
      if (this.checkBtnSaveDisabled(event)) {
        CommentPost.user_id = this.commonService.getId();
        CommentPost.post_id = this.get("post").id;
        this.doSave("comment", CommentPost).then(function (response) {
          context.get("comments").pushObject(response);
          context.emptyField();
        });
        this.debug(CommentPost);
        this.debug(this.get("post").id);
      }
    }
  }
});
