import axios from 'axios';

export default class BaseService {
    constructor(API, token) {
        this.API = API;
        if (token) {
            this.token = token
        } else {
            this.token = null;
        }
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

    update(body, param) {
        this.method = "PUT";
        const api = `${this.API}/${param}`;
        return this.build(api, body);
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
        const header = this.token === null ? {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            } : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': this.token
            };

        let data;
        if (body) {
            data = JSON.stringify(body);
        } else {
            data = null;
        }

        const request = this.method === "GET" ? axios({method: this.method, url: api, headers: header}) :
            axios({method: this.method, url: api, headers: header, data: data});

        return request.catch(function (err) {
            console.log(err);
        });
    }
}