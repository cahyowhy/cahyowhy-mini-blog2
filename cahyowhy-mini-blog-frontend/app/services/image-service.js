import Ember from 'ember';
import BaseService from './base-services';
import ENV from '../config/environment';

export default Ember.Service.extend(BaseService, {
  init(){
    this._super(ENV.APP.API_IMAGE);
  }
});
