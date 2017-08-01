import Ember from 'ember';
import BaseController from '../base-controller';
import Status from '../../entity/status';

export default Ember.Controller.extend(BaseController, {
  status: Status.create(),
  isBtnDisable: Ember.computed.empty('status.status.statushtml'),
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
  options: {
    selector: 'textarea',
    branding: false,
    height: "54",
    menubar: false,
    statusbar: false,
    toolbar: false
  },
  afterRender(){
    this._super(...arguments);
    this.debug(this.get('commentstatus'));
    this.debug(this.get('statuses'));
  },
  emptyField(){
    this.set('status.status.statushtml', '');
  },
  actions: {
    onTypeSomething(value){
      let status = this.get('status');
      status.set('status.statushtml', value);
    },
    onAddImage(){
      this.debug("add");
    },
    onDelImage(){
      this.debug("del");
    },
    doSave(event){
      let status = this.get('status');
      status.set('status.user_id', this.commonService.getId());
      

      if (this.checkBtnSaveDisabled(event)) {
        this.doSave("commentstatus",)
      }
    }
  }
});
