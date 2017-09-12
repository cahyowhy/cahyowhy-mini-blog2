import baseService from './baseService';
export default class likecommentpostService extends baseService {
    constructor() {
        super(process.env.APP.API_POST_LIKE_COMMENT);
    }
}