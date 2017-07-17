import Ember from 'ember';
import ENV from '../config/environment';
import BaseService from './base-services';

export default Ember.Service.extend(BaseService,{
  init(){
    this._super(ENV.APP.API_POST_COMMENT);
  },
  findCommentPostByPostid(param){
    return this.find("post/" + param);
  },
  saveCommentPost(post, authorization){
    return this.save(post, authorization);
  }
});
