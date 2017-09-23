import BaseService from './BaseServices';
import Config from 'react-native-config'
export default class ImageService extends BaseService {
    constructor(token) {
        super(Config.apiImages, token);
    }
}
