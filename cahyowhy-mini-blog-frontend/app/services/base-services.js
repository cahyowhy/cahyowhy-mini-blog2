import Ember from "ember";
import fetch from 'ember-fetch/ajax';
export default Ember.Mixin.create({
  method: {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE'
  },
  init(api, param = null) {
    this.api = api;
    this.param = param;
  },
  delete(param = "", authorization = ""){
    let api = this.api + param;
    return this.service(this.method.delete, api, authorization);
  },
  find(param = "", authorization = "") {
    let api = this.api + param;
    return this.service(this.method.get, api, authorization);
  },
  save(obj, authorization = ""){
    return this.service(this.method.post, this.api, authorization, this.convertJSON(obj));
  },
  convertJSON(obj) {
    try {
      JSON.parse(obj);
    } catch (e) {
      return JSON.stringify(obj);
    }

    return obj;
  },
  service(type = this.method.get, url = '', authorization = null, body = null) {
    const context = this;
    return new Ember.RSVP.Promise(
      function (resolve, reject) {
        fetch(url, {
          method: type,
          headers: {
            'Content-Type': 'application/json',
            "Authorization": authorization
          },
          /*xhrFields: {
           onprogress: function (e) {
           context.debug(e);
           }
           }*/
          body: body,
        })/*.progress(function (progress) {
         context.debug(progress);
         })*/.then(function (response) {
          resolve(response);
        }).catch(function (error) {
          reject(error);
        })
      });
  },
});
