import Ember from 'ember';

export default Ember.Mixin.create({
  init(){
    this._super(...arguments);
    let afterRenderExist = this.afterRender !== undefined && typeof this.afterRender === "function";
    if (this.applicationRoute.documentReady && afterRenderExist) {
      Ember.run.schedule('afterRender', this, function () {
        this.afterRender();
      });
    } else if (afterRenderExist) {
      this.applicationRoute.on('onDocumentReady', this, function () {
        this.afterRender();
      });
    }
  },
  checkBtnSaveDisabled(event){
    return !(Ember.$(event.target).attr("disabled"));
  },
  doRemove(type = "", param){
    let del;
    this.debug(this.commonService.getToken());
    switch (type) {
      case "image":
        del = this.imageService.delete(param, this.commonService.getToken());
        break;
      default:
        break;
    }

    return new Ember.RSVP.Promise(function (resolve, reject) {
      del.then(function (response) {
        context.commonService.showNotification(response.httpstatus);
        Ember.run.later(function () {
          resolve(response);
        }, 1200);
      }).catch(function (err) {
        reject(err);
      });
    });
  },
  doFind(type = "", param){
    let find;
    const context = this;
    switch (type) {
      case "post":
        find = this.postService.find(param);
        break;
      case "image":
        find = this.imageService.find(param);
        break;
      default:
        break;
    }

    return new Ember.RSVP.Promise(function (resolve, reject) {
      find.then(function (response) {
        resolve(response);
      }).catch(function (err) {
        reject(err);
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
        context.commonService.showNotification(response.httpstatus);
        Ember.run.later(function () {
          resolve(response);
        }, 1200);
      }).catch(function (err) {
        reject(err);
      });
    });
  },
  doSave(type = "", obj = null){
    let post;
    const context = this;
    switch (type) {
      case "user":
        post = this.userService.save(obj);
        break;
      case "login":
        post = this.loginService.save(obj);
        break;
      case "post":
        post = this.postService.savePost(obj, this.commonService.getToken());
        break;
      case "comment":
        post = this.commentpostService.save(obj, this.commonService.getToken());
        break;
      case "likecommentpost":
        post = this.likecommentpostService.save(obj, this.commonService.getToken());
        break;
      case "likepost":
        post = this.likepostService.save(obj, this.commonService.getToken());
        break;
      default :
        break;
    }

    return new Ember.RSVP.Promise(function (resolve, reject) {
      post.then(function (response) {
        context.commonService.showNotification(response.httpstatus);
        Ember.run.later(function () {
          resolve(response);
        }, 1200);
      }).catch(function (err) {
        reject(err);
      });
    });
  }
});
