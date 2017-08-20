/**
 * Created by cahyo on 7/27/17.
 */
import Ember from 'ember';
import BaseEntity from './base';

export default Ember.Object.extend(BaseEntity, {
  init(){
    this._super(this.get("user"), {
      user: {
        name: "",
        username: "",
        imageurl: "",
        password: '',
        facebook_id: '',
      }
    });
  }
});
