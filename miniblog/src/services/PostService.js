import BaseService from './BaseServices';
import Config from 'react-native-config'
export default class PostService extends BaseService {
    constructor(token) {
        super(Config.apiPost, token);
    }
}
