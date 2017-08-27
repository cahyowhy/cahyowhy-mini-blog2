import Ember from 'ember';
const { set, get } = Ember;
export default Ember.Mixin.create({
  init() {
    this._super(...arguments);
  },
  showAlertLogin() {
    Ember.$("#modal-not-login").modal('show');
  },
  checkBtnSaveDisabled(event) {
    return !(Ember.$(event.target).attr("disabled"));
  },
  doRemove(type = "", param = "", obj = {}) {
    let del;
    const context = this;
    switch (type) {
      case "image":
        del = this.imageService.delete(param);
        break;
      case "relation":
        del = this.relationshipService.delete(param, obj);
        break;
      default:
        break;
    }

    return new Ember.RSVP.Promise(function(resolve, reject) {
      del.then(function(response) {
        context.commonService.showNotification(response.httpstatus);
        Ember.run.later(function() {
          resolve(response);
        }, 1200);
      }).catch(function(err) {
        reject(err);
      });
    });
  },
  doFindPostNextById(id) {
    const nextPost = this.postService.findPostNextById(id);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      nextPost.then(function(response) {
        resolve(response);
      }).catch(function(err) {
        reject(err);
      });
    })
  },
  doFindPostPrevById(id) {
    const nextPost = this.postService.findPostPrevById(id);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      nextPost.then(function(response) {
        resolve(response);
      }).catch(function(err) {
        reject(err);
      });
    })
  },
  doAuth() {
    const auth = this.authService.auth();
    return new Ember.RSVP.Promise(function(resolve, reject) {
      auth.then(function(response) {
        resolve(response)
      }).catch(function(err) {
        reject(err);
      });
    })
  },
  doFind(type = "", param) {
    let find;
    const context = this;
    switch (type) {
      case "post":
        find = this.postService.find(param);
        break;
      case "likestatus":
        find = this.likestatusService.find(param);
        break;
      case "user":
        find = this.userService.find(param);
        break;
      case "image":
        find = this.imageService.find(param);
        break;
      case "timeline":
        find = this.timelineService.find(param);
        break;
      case "comment":
        find = this.commentpostService.find(param);
        break;
      case "relation":
        find = this.relationshipService.find(param);
        break;
      case "commentstatus":
        find = this.commentstatusService.find(param);
        break;
      case "notification":
        find = this.notificationService.find(param);
        break;
      case "status":
        find = this.statusService.find(param);
        break;
      default:
        break;
    }

    return new Ember.RSVP.Promise(function(resolve, reject) {
      find.then(function(response) {
        resolve(response);
      }).catch(function(err) {
        reject(err);
      });
    });
  },
  doUpdate(type = "", obj = null) {
    let update;
    const context = this;
    switch (type) {
      case "user":
        update = this.userService.doUpdateUser(this.commonService.getId(), obj);
        break;
      default:
        break;
    }

    return new Ember.RSVP.Promise(function(resolve, reject) {
      update.then(function(response) {
        context.commonService.showNotification(response.httpstatus);
        Ember.run.later(function() {
          resolve(response);
        }, 1200);
      }).catch(function(err) {
        reject(err);
      });
    });
  },
  doSave(type = "", obj = null, param = "") {
    let post;
    const context = this;
    switch (type) {
      case "user":
        post = this.userService.save(obj);
        break;
      case "relation":
        post = this.relationshipService.save(obj);
        break;
      case "login":
        post = this.loginService.save(obj, param);
        break;
      case "post":
        post = this.postService.save(obj);
        break;
      case "status":
        post = this.statusService.save(obj);
        break;
      case "comment":
        post = this.commentpostService.save(obj);
        break;
      case "likecommentpost":
        post = this.likecommentpostService.save(obj);
        break;
      case "likestatus":
        post = this.likestatusService.save(obj);
        break;
      case "likepost":
        post = this.likepostService.save(obj);
        break;
      case "commentstatus":
        post = this.commentstatusService.save(obj);
        break;
      default:
        break;
    }

    return new Ember.RSVP.Promise(function(resolve, reject) {
      post.then(function(response) {
        context.commonService.showNotification(response.httpstatus);
        Ember.run.later(function() {
          resolve(response);
        }, 1200);
      }).catch(function(err) {
        context.commonService.showCustomNotification(err.statusText);
        context.debug(err);
        reject(err);
      });
    });
  }
});
