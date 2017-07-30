import Ember from 'ember';
import ENV from '../config/environment';
import BaseService from './base-services';

export default Ember.Service.extend(BaseService, {
  init(){
    this._super(ENV.APP.API_POST);
  },
  findPostNextById(param){
    return this.find("next/" + param);
  },
  findPostPrevById(param){
    return this.find("prev/" + param);
  }
});
