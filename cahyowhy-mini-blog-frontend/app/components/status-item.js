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
  comment: "",
  isBtnDisable: Ember.computed.empty('comment'),
  // comment: Commentstatus.create(),
  doEmptyField(){
    this.set("comment", "");
  },
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
            imageurl: results.imageurl,
            user: {
              username: results.user.username
            }
          });
          context.doEmptyField();
        });
      }
    }
  }
});
