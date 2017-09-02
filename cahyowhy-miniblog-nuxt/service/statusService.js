import baseService from './baseService';
export default class statusService extends baseService {
    constructor() {
        super(process.env.APP.API_STATUS);
    }
}
