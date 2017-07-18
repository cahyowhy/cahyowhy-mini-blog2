import Ember from 'ember';

export default Ember.Mixin.create({
  init(){
    this._super(...arguments);
    Ember.run.schedule('afterRender', this, function () {
      this.didInsertElement();
    });
  },
  didInsertElement(){
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
    const context = this;
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

    return new Ember.RSVP.Promise(function (resolve, reject) {
      post.then(function (response) {
        // context.commonService.showNotification(response.status); my response status is empty still searching for merging object to rails json serializer
        context.commonService.showNotification(202);
        Ember.run.later(function () {
          resolve(response);
        }, 1200);
      }).catch(function (err) {
        if (type === "login") {
          context.commonService.showNotification(404);
        } else {
          context.commonService.showNotification(400);
        }
        reject(err);
      });
    });
  }
});
