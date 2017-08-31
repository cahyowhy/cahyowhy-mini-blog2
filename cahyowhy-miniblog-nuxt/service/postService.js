/**
 * Created by MGS on 8/30/2017.
 */
import baseService from './baseService';
export default class postService extends baseService {
    constructor() {
        super(process.env.APP.API_POST);
    }
}