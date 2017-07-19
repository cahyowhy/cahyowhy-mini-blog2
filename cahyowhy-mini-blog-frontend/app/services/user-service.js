import Ember from 'ember';
import ENV from '../config/environment';
import BaseService from './base-services';

export default Ember.Service.extend(BaseService, {
  init(){
    this._super(ENV.APP.API_USER);
  },
  findAllUser(){
    return this.find();
  },
  findUserById(param){
    return this.find(param);
  },
  saveUser(user){
    return this.save(user);
  },
  doUpdateUser(param, user, authorization){
    return this.update(param, user, authorization)
  }
});
