import BaseService from './BaseServices';
import Config from 'react-native-config'
export default class LoginService extends BaseService {
    constructor(token) {
        super(Config.apiLogin, token);
    }
}
