import baseService from './baseService';
export default class commentstatusService extends baseService {
    constructor() {
        super(process.env.APP.API_STATUS_COMMENT);
    }
}
