import baseService from './baseService';
export default class userService extends baseService {
  constructor() {
    super(process.env.APP.API_USER);
  }
}
