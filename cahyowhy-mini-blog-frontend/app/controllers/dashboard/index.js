import Ember from 'ember';
import BaseController from '../base-controller';
import Status from '../../entity/status';

export default Ember.Controller.extend(BaseController, {
  status: Status.create(),
  commentstatus: Ember.computed('statuses', function () {
    let commentstatuses = [];
    this.get('statuses').forEach(function (item, index) {
      commentstatuses.pushObject({
        comment: '',
        user_id: '',
        status_id: item.id
      });
    });

    return commentstatuses;
  }),
  afterRender(){
    this._super(...arguments);
    this.debug(this.get('commentstatus'));
    this.debug(this.get('statuses'));
  },
  emptyField(){

  },
  actions: {
    onAddImage(){
      this.debug("add");
    },
    onDelImage(){
      this.debug("del");
    },
    doSaveComment(param, param2){
      this.debug(this.get('commentstatus'));
      this.debug(param);
      this.debug(param2);
    }
  }
});
