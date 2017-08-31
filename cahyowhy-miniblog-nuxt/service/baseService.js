import axios from 'axios';
export default class baseService {
  constructor(API) {
    this.API = API;
  }

  get(param = "") {
    this.method = "GET";
    let api;
    if (typeof param === "object" && param !== null) {
      api = "?";
      const objectLength = Object.keys(param).length;
      let index = 0;
      for (let key in param) {
        index = index + 1;
        api = objectLength === index ? api + key + "=" + param[key] : api + key + "=" + param[key] + "&";
      }

      api = this.API + api;
    } else if (typeof param === "string" && param !== null) {
      api = `${this.API}/${param}`;
    }

    return this.build(api)
  }

  store(body) {
    this.method = "POST";
    return this.build(this.API, body);
  }

  update() {
  }

  /**
   *
   * @param {string} param
   * @returns {function}
   */
  destroy(param) {
    this.method = "DELETE";
    return this.build(this.API + `/${param}`);
  }

  build(api, body = null) {
    return axios({
      method: this.method,
      url: api,
      data: JSON.stringify(body),
    });
  }
}