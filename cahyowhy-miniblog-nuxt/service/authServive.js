import baseService from './baseService';
export default class authServive extends baseService {
  constructor() {
    super(process.env.APP.API_AUTH);
  }
}
