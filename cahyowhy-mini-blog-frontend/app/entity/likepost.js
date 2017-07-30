import Ember from 'ember';
import BaseEntity from './base';

export default Ember.Object.extend(BaseEntity, {
  init(){
    this._super(this.get("likepost"), {
      likepost: {
        post_id: "",
      }
    });
  }
});