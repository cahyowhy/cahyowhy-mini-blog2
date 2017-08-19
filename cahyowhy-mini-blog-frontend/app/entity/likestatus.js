import Ember from 'ember';
import BaseEntity from './base';

export default Ember.Object.extend(BaseEntity, {
  init(){
    this._super(this.get("likestatus"), {
      likestatus: {
        status_id: "",
        user_id: "",
        emoticons: ""
      }
    });
  }
});
