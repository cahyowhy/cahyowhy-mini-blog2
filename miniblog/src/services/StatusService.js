import BaseService from './BaseServices';
import Config from 'react-native-config'
export default class StatusService extends BaseService {
    constructor(token) {
        super(Config.apiStatus, token);
    }
}
