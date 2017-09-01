import baseService from './baseService';
export default class postService extends baseService {
    constructor() {
        super(process.env.APP.API_POST);
    }
}