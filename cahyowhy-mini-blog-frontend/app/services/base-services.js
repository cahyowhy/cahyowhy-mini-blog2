import Ember from "ember";
import fetch from 'ember-fetch/ajax';
export default Ember.Mixin.create({
  commonService: Ember.inject.service(),
  method: {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE'
  },
  init(api) {
    this.api = api;
  },
  delete(param = "", obj){
    let api = this.api + param;
    const condition = obj === null || obj === "";
    const service = condition ? this.service(this.method.delete, api)
      : this.service(this.method.delete, api, this.convertJSON(obj));
    
    return service;
  },
  find(param = "") {
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
    return this.service(this.method.get, api);
  },
  save(obj, param = ""){
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

    return this.service(this.method.post, api, this.convertJSON(obj));
  },
  update(param = "", obj){
    return this.service(this.method.put, this.api + param, this.convertJSON(obj));
  },
  convertJSON(obj) {
    try {
      JSON.parse(obj);
    } catch (e) {
      return JSON.stringify(obj);
    }

    return obj;
  },
  service(type = this.method.get, url = '', body = null) {
    const authorization = this.get('commonService').getToken();
    const header = authorization !== null ? {
      'Content-Type': 'application/json',
      "Authorization": authorization
    } : {'Content-Type': 'application/json'};

    return new Ember.RSVP.Promise(
      function (resolve, reject) {
        fetch(url, {
          method: type,
          headers: header,
          body: body,
        }).then(function (response) {
          resolve(response);
        }).catch(function (error) {
          reject(error);
        })
      });
  },
});
