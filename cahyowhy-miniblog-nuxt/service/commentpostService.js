import baseService from './baseService';
export default class commentpostService extends baseService {
    constructor() {
        super(process.env.APP.API_POST_COMMENT);
    }
}