import Base from './base';
export default class LikePost extends Base {
  constructor() {
    const likepost = {
      post_id: {
        status_id: "",
        user_id: ""
      }
    };
    super(likepost);
  }
}
