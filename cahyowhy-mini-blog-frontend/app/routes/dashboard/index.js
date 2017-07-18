import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
      posts: this.postService.findPostByUserid(this.modelFor('dashboard').id)
    })
  },
  setupController(controller, model){
    this.controllerFor('dashboard.index').set('posts', model.posts);
  },
  afterModel(model){
    const context = this;
    Ember.run.schedule('afterRender', function () {
      context.controllerFor('dashboard.index').setPost(model.posts);
    });
  }
});
