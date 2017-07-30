import Ember from 'ember';
import BaseEntity from './base';

export default Ember.Object.extend(BaseEntity, {
  init(){
    this._super(this.get("post"), {
      post: {
        title: "",
        category: "",
        imageposts_attributes: [],
        description: '',
        review: '',
        descriptiontext: ''
      }
    });
  }
});
