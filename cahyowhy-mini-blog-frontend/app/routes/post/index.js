import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Route.extend({
  model(){
    const query = {
      offset: ENV.APP.DEFAULT_OFFSET,
      limit: ENV.APP.DEFAULT_LIMIT
    };

    return Ember.RSVP.hash({
      posts: this.postService.find(query)
    });
  },
  afterModel(model){
    this.controllerFor('post.index').set('posts', model.posts);
  }
});
