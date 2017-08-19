import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Route.extend({
  beforeModel(){
    this.debug(this.controllerFor('post.category').set('posts', []));
  },
  model(param){
    const query = {
      offset: ENV.APP.DEFAULT_OFFSET,
      limit: ENV.APP.DEFAULT_LIMIT,
      category: param.id
    };

    return Ember.RSVP.hash({
      posts: this.postService.find(query),
      category: this.category
    });
  },
  afterModel(model){
    this.controllerFor('post.category').set('posts', model.posts);
    this.controllerFor('post.category').set('category', model.category);
  },
  actions: {
    willTransition(){
      Ember.$('#post-container').off();
      Ember.$('#post-container').removeAttr('style');
    }
  }
});
