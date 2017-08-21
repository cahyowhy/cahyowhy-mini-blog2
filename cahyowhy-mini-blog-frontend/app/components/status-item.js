import Ember from 'ember';
import BaseController from '../controllers/base-controller';
import offsetLimit from '../entity/offsetlimit';
import ENV from '../config/environment';

export default Ember.Component.extend(BaseController, {
  commentOffset: 0,
  comment: "",
  isBtnDisable: Ember.computed.empty('comment'),
  isCommentMax: true,
  doEmptyField(){
    this.set("comment", "");
  },
  isLogedIn: Ember.computed('applicationRoute.authentication', function () {
    return this.get("applicationRoute.authentication");
  }),
  statusImagesSize: Ember.computed('statusImages', function () {
    return this.get('statusImages').length;
  }),
  statusImagesSizeIfGT3: Ember.computed('statusImagesSize', function () {
    return this.get("statusImagesSize") > 4 ? this.get("statusImagesSize") - 4 : 0;
  }),
  actions: {
    onloadcomment(param){
      const context = this;
      this.set('commentOffset', this.get('commentOffset') + ENV.APP.DEFAULT_LIMIT);
      let query = function () {
        let commentstatus = {};
        commentstatus['status_id'] = param;
        for (let key in offsetLimit(context.get('commentOffset'))) {
          commentstatus[key] = offsetLimit(context.get('commentOffset'))[key];
        }

        return commentstatus;
      };

      this.doFind('commentstatus', query()).then(function (results) {
        results.forEach(function (item) {
          context.get('commentstatuses').unshiftObject(item);
        });
        context.set('isCommentMax', results.length > 0);
      }).catch(function () {
        context.set('isCommentMax', results.length > 0);
      });
    },
    doSaveComment(event){
      const context = this;
      if (this.checkBtnSaveDisabled(event)) {
        let comment = {
          commentstatus: {
            user_id: context.commonService.getId(),
            status_id: context.get("statusId"),
            comment: context.get('comment')
          }
        };
        this.doSave("commentstatus", comment).then(function (results) {
          context.debug(results);
          context.get('commentstatuses').pushObject({
            id: results.id,
            comment: results.comment,
            user: {
              imageurl: results.user.imageurl,
              username: results.user.username
            }
          });
          context.doEmptyField();
        });
      }
    }
  }
});
