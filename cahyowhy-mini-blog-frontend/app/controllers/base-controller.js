import Ember from 'ember';

export default Ember.Mixin.create({
  init(){
    this._super(...arguments);
    Ember.run.schedule('afterRender', this, function () {
      this.didInsertElment();
    });
  },
  didInsertElment(){
    this._super(...arguments);
  },
  checkBtnSaveDisabled(event){
    return !(Ember.$(event.target).attr("disabled"));
  },
  doRemove(type = "", param){
    let del;
    this.debug(this.commonService.getToken());
    switch (type) {
      case "image":
        del = this.imageService.deleteImage(param, this.commonService.getToken());
        break;
      default:
        break;
    }

    return new Ember.RSVP.Promise(function (resolve) {
      del.then(function (response) {
        resolve(response);
      });
    });
  },
  doSave(type = "", obj = null){
    let post;
    switch (type) {
      case "user":
        post = this.userService.saveUser(obj);
        break;
      case "login":
        post = this.loginService.login(obj);
        break;
      case "post":
        post = this.postService.savePost(obj, this.commonService.getToken());
        break;
      case "comment":
        post = this.commentpostService.saveCommentPost(obj, this.commonService.getToken());
        break;
      default :
        break;
    }

    return new Ember.RSVP.Promise(function (resolve) {
      post.then(function (response) {
        resolve(response);
      });
    });
  }
});
