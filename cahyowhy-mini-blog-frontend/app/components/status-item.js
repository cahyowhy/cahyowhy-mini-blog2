import Ember from 'ember';
import BaseController from '../controllers/base-controller';
// import Commentstatus from '../entity/commentstatus';

export default Ember.Component.extend(BaseController, {
  /*
   * lets pay attention the syntax that i've comment out
   * this shit is make all your  comment.Commentstatus.comment value
   * in your textarea is redundant for all the component status-item
   * when you try to texting in one of status-item,
   * all your textarea status-item will also has a value!
   * */
  // comment: Commentstatus.create(),
  comment: "",
  isBtnDisable: Ember.computed.empty('comment'),
  doEmptyField(){
    this.set("comment", "");
  },
  statusImagesSize: Ember.computed('statusImages', function () {
    return this.get('statusImages').length;
  }),
  statusImagesSizeIfGT3: Ember.computed('statusImagesSize', function () {
    return this.get("statusImagesSize") > 4 ? this.get("statusImagesSize") - 4 : 0;
  }),
  actions: {
    doSaveComment(event){
      const context = this;
      /*let comment = this.get("comment");
       comment.set('commentstatus.user_id', this.commonService.getId());
       comment.set('commentstatus.status_id', this.get('statusId'));
       this.debug(comment);*/
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
