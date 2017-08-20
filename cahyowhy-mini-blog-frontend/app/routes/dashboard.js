import Ember from 'ember';

export default Ember.Route.extend({
  isCurrentUser: false,
  model(param){
    const isCurrentUser = this.commonService.getId() === param.id.toString();
    this.isCurrentUser = isCurrentUser;
    const hash = isCurrentUser ? {
      isCurrentUser: isCurrentUser,
      id: param.id,
      user: this.userService.find(param.id)
    } : {
      isCurrentUser: isCurrentUser,
      id: param.id,
      user: this.userService.find(param.id),
      isFollowing: this.userService.find("isfollow/" + param.id, this.commonService.getToken())
    };

    return Ember.RSVP.hash(hash)
  },
  setupController(controller, model){
    if (!this.isCurrentUser) {
      this.controllerFor('dashboard').set('isFollowing', model.isFollowing);
      this.controllerFor('dashboard').set('btnFollow', Ember.computed('isFollowing', () => {
        return this.get('isFollowing') ? "unfollow" : "follow";
      }));
    }

    this.controllerFor('dashboard').set('user', model.user);
    this.controllerFor('dashboard').set('isCurrentUser', model.isCurrentUser);
    this.controllerFor('dashboard.index').set('imageProfile', model.user.imageurl);
    this.controllerFor('dashboard.index').set('id', model.id);
  }
});
