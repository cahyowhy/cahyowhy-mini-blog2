import Ember from "ember";
import fetch from 'ember-fetch/ajax';
export default Ember.Mixin.create({
  method: {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE'
  },
  init(api) {
    this.api = api;
  },
  delete(param = "", authorization = "", obj){
    let api = this.api + param;
    return this.service(this.method.delete, api, authorization, this.convertJSON(obj));
  },
  find(param = "", authorization = "") {
    let api = "?";
    if (typeof param === 'object' && param !== null) {
      const objectLength = Object.keys(param).length;
      let index = 0;
      for (let key in param) {
        index = index + 1;
        api = objectLength === index ? api + key + "=" + param[key] : api + key + "=" + param[key] + "&";
      }

      api = this.api + api;
    } else {
      api = this.api + param;
    }
    return this.service(this.method.get, api, authorization);
  },
  save(obj, authorization = "", param = ""){
    let api = "?";
    if (typeof param === 'object' && param !== null) {
      const objectLength = Object.keys(param).length;
      let index = 0;
      for (let key in param) {
        index = index + 1;
        api = objectLength - 1 === index ? api + key + "=" + param[key] : api + key + "=" + param[key] + "&";
      }

      api = this.api + api;
    } else {
      api = this.api + param;
    }

    return this.service(this.method.post, api, authorization, this.convertJSON(obj));
  },
  update(param = "", obj, authorization = ""){
    return this.service(this.method.put, this.api + param, authorization, this.convertJSON(obj));
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
