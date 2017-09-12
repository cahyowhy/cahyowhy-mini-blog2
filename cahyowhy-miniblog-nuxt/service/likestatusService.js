import baseService from './baseService';
export default class likestatusService extends baseService {
    constructor() {
        super(process.env.APP.API_STATUS_LIKE);
    }
}