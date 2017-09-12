import baseService from './baseService';
export default class likepostService extends baseService {
    constructor() {
        super(process.env.APP.API_POST_LIKE);
    }
}