import BaseService from './BaseServices';
import Config from 'react-native-config'
export default class CommentPostService extends BaseService {
    constructor(token) {
        super(Config.apiCommentPost, token);
    }
}
