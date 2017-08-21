import Base from './base';
export default class Status extends Base {
  constructor() {
    const status = {
      status: {
        user_id: '',
        statustext: "",
        statushtml: "",
        imagestatuses_attributes: []
      }
    };
    super(status);
  }
}
