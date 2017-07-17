import Ember from 'ember';
import ENV from '../config/environment';
import BaseService from './base-services';

export default Ember.Service.extend(BaseService, {
  init(){
    this._super(ENV.APP.API_POST);
  },
  findAllPost(){
    return this.find();
  },
  findPostById(param){
    return this.find(param);
  },
  findPostNextById(param){
    return this.find("next/" + param);
  },
  findPostPrevById(param){
    return this.find("prev/" + param);
  },
  findPostByUserid(param){
    return this.find("user/" + param);
  },
  savePost(post, authorization){
    return this.save(post, authorization);
  }
});
