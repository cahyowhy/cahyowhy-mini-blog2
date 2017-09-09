import baseService from './baseService';
export default class authService extends baseService {
  constructor() {
    super(process.env.APP.API_AUTH);
  }
}
