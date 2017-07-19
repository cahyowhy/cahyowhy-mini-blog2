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
  doUpdate(type = "", obj = null){
    let update;
    const context = this;
    switch (type) {
      case "user":
        update = this.userService.doUpdateUser(this.commonService.getId(), obj, this.commonService.getToken());
        break;
      default:
        break;
    }

    return new Ember.RSVP.Promise(function (resolve, reject) {
      update.then(function (response) {
        context.commonService.showNotification(202);
        Ember.run.later(function () {
          resolve(response);
        }, 1200);
      }).catch(function (err) {
        context.commonService.showNotification(402);
        reject(err);
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
      case "likecomment":
        post = this.likecommentpostService.saveLikecommentpost(obj, this.commonService.getToken());
        break;
      case "likepost":
        post = this.likepostService.saveLikepost(obj, this.commonService.getToken());
        break;
      default :
        break;
    }

    return new Ember.RSVP.Promise(function (resolve, reject) {
      post.then(function (response) {
        context.commonService.showNotification(201);
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
