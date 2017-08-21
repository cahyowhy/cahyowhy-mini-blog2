import Base from './base';
export default class ImageStatus extends Base {
  constructor() {
    const imagestatus = {
      imagestatuses_attributes: {
        imageurl: '',
        status_id: '',
        user_id: ''
      }
    };
    super(imagestatus);
  }
}
