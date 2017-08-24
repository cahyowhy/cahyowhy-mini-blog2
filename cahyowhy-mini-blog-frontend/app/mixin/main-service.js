import Ember from 'ember';
const {set} = Ember;
export default Ember.Mixin.create({
  authentication: false,
  setAuthentication(param){
    set(this, 'authentication', param);
  },
  showAlertLogin(){
    Ember.$("#modal-not-login").modal('show');
  },
  checkBtnSaveDisabled(event){
    return !(Ember.$(event.target).attr("disabled"));
  },
  doRemove(type = "", param = "", obj = {}){
    let del;
    const context = this;
    this.debug(this.commonService.getToken());
    switch (type) {
      case "image":
        del = this.imageService.delete(param, this.commonService.getToken());
        break;
      case "relation":
        del = this.relationshipService.delete(null, this.commonService.getToken(), obj);
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
        find = this.timelineService.find(param, this.commonService.getToken());
        break;
      case "comment":
        find = this.commentpostService.find(param);
        break;
      case "commentstatus":
        find = this.commentstatusService.find(param);
        break;
      case "status":
        find = this.statusService.find(param);
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
  doSave(type = "", obj = null, param = ""){
    let post;
    const context = this;
    switch (type) {
      case "user":
        post = this.userService.save(obj);
        break;
      case "relation":
        post = this.relationshipService.save(obj, this.commonService.getToken());
        break;
      case "login":
        post = this.loginService.save(obj, null, param);
        break;
      case "post":
        post = this.postService.save(obj, this.commonService.getToken());
        break;
      case "status":
        post = this.statusService.save(obj, this.commonService.getToken());
        break;
      case "comment":
        post = this.commentpostService.save(obj, this.commonService.getToken());
        break;
      case "likecommentpost":
        post = this.likecommentpostService.save(obj, this.commonService.getToken());
        break;
      case "likestatus":
        post = this.likestatusService.save(obj, this.commonService.getToken());
        break;
      case "likepost":
        post = this.likepostService.save(obj, this.commonService.getToken());
        break;
      case "commentstatus":
        post = this.commentstatusService.save(obj, this.commonService.getToken());
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
        context.commonService.showCustomNotification(err.statusText);
        context.debug(err);
        reject(err);
      });
    });
  }
});
