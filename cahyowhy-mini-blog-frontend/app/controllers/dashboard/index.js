import Ember from 'ember';
import BaseController from '../base-controller';
import Status from '../../entity/status';

export default Ember.Controller.extend(BaseController, {
  status: Status.create(),
  afterRender(){
    this._super(...arguments);
    this.debug(this.get("userId"));
  },
  actions: {
    onAddImage(){
      this.debug("add");
    },
    onDelImage(){
      this.debug("del");
    },
    doSaveComment(){

    }
  }
});
