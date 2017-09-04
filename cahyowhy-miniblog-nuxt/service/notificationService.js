import baseService from './baseService';
export default class notificationService extends baseService {
  constructor() {
    super(process.env.APP.API_NOTIFICATION);
  }
}
