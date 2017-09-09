import baseService from './baseService';
export default class loginService extends baseService {
  constructor() {
    super(process.env.APP.API_LOGIN);
  }
}
