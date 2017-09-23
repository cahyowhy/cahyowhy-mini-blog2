import BaseService from './BaseServices';
import Config from 'react-native-config'
export default class UserService extends BaseService {
    constructor(token) {
        super(Config.apiUser, token);
    }
}
