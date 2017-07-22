import Ember from 'ember';
import ENV from '../config/environment';
import BaseService from './base-services';

export default Ember.Service.extend(BaseService, {
  init(){
    this._super(ENV.APP.API_POST_LIKE_COMMENT);
  },
  saveLikecommentpost(post, authorization){
    return this.save(post, authorization);
  },
  findLikecommentpostById(param){
    return this.find("post/" + param);
  }
});