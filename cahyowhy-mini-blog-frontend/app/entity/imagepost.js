import Base from './base';
export default class ImagePost extends Base {
  constructor() {
    const imagepost = {
      imageposts_attributes: {
        imageurl: '',
        post_id: '',
        user_id: ''
      }
    };
    super(imagepost);
  }
}
