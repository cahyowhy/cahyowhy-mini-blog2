import Ember from 'ember';
import BaseController from '../base-controller';
import ENV from '../../config/environment';
import offsetlimit from '../../entity/offsetlimit';
import Post from '../../entity/post';

let offset = 0;
export default Ember.Controller.extend(BaseController, {
  actions: {
    onLoadPost(){
      const context = this;
      offset = offset + ENV.APP.DEFAULT_LIMIT;
      let offsetlimit_ = offsetlimit(offset);
      let post = Post.create();
      post.set('post.user_id', this.commonService.getId());
      post = post.getChildWithSelection(['user_id']);
      for (let key in offsetlimit_) {
        post[key] = offsetlimit_[key];
      }

      this.doFind("post", post).then(function (response) {
        response.forEach(function (item) {
          context.get('posts').pushObject(item);
        });
      });
    }
  }
});
