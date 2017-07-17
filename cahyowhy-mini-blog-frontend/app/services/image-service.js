import Ember from 'ember';
import BaseService from './base-services';
import ENV from '../config/environment';

export default Ember.Service.extend(BaseService, {
  init(){
    this._super(ENV.APP.API_IMAGE);
  },
  findAllImage(){
    return this.find();
  },
  findImageById(param){
    return this.find(param);
  },
  findImageByUserid(param){
    return this.find("user/" + param);
  },
  deleteImage(param, authorization){
    return this.delete(param, authorization)
  }
});
