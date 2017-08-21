import Ember from 'ember';

export default Ember.Route.extend({
  isCurrentUser: false,
  isLogedIn: false,
  model(param){
    this.isLogedIn = this.commonService.getId() !== null;
    let hash;
    if (this.isLogedIn) {
      const isCurrentUser = this.commonService.getId() === param.id.toString();
      this.isCurrentUser = isCurrentUser;
      hash = isCurrentUser ? {
          isCurrentUser: isCurrentUser,
          id: param.id,
          user: this.userService.find(param.id),
          isLogedIn: this.isLogedIn
        } : {
          isCurrentUser: isCurrentUser,
          id: param.id,
          user: this.userService.find(param.id),
          isFollowing: this.userService.find("isfollow/" + param.id, this.commonService.getToken()),
          isLogedIn: this.isLogedIn
        };
    } else {
      hash = {
        isCurrentUser: this.isCurrentUser,
        id: param.id,
        user: this.userService.find(param.id),
        isLogedIn: this.isLogedIn
      };
    }

    return Ember.RSVP.hash(hash)
  },
  afterModel(model){
    const controller = this.controllerFor('dashboard');
    if (!this.isCurrentUser && this.isLogedIn) {
      model.isFollowing = model.isFollowing.isfollowing;
      controller.set('isFollowing', model.isFollowing);
      controller.set('btnFollow', Ember.computed('isFollowing', () => {
        this.debug(this.get('isFollowing'));
        return this.get('isFollowing') ? "unfollow" : "follow";
      }));
    }

    controller.set('isCurrentUser', model.isCurrentUser);
    controller.set('isLogedIn', model.isLogedIn);
    controller.set('user', model.user);
    controller.set('id', model.id);
    this.controllerFor('dashboard.post').set('isLogedIn', model.isLogedIn);
    this.controllerFor('dashboard.index').set('imageProfile', model.user.imageurl);
    this.controllerFor('dashboard.index').set('id', model.id);
  }
});
