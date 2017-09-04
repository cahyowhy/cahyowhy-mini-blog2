import baseService from './baseService';
export default class imageService extends baseService {
  constructor() {
    super(process.env.APP.API_IMAGE);
  }
}
