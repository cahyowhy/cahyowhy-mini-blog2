import BaseService from './BaseServices';
import Config from 'react-native-config'
export default class NotificationService extends BaseService {
    constructor(token) {
        super(Config.apiNotifications, token);
    }
}
