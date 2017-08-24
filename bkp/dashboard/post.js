import Ember from 'ember';
import BaseController from '../../cahyowhy-mini-blog-frontend/app/controllers/base-controller';
import ENV from '../../config/environment';
import offsetlimit from '../../cahyowhy-mini-blog-frontend/app/entity/offsetlimit';
import Post from '../../cahyowhy-mini-blog-frontend/app/entity/post';

let offset = 0;
export default Ember.Controller.extend(BaseController, {
  token: '0',
  userId: 0,
  ifPostIsEmpty: Ember.computed('posts', function () {
    return this.get('posts').length === 0;
  }),
  afterRender(){
    this.set('token', this.commonService.getToken());
    this.set('userId', this.commonService.getId());
  },
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
        if (response.length === 0) {
          context.set("ifPostIsEmpty", true);
        }
      });
    }
  }
});
