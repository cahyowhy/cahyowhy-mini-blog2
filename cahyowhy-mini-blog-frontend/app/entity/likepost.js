import Base from './base';
export default class LikePost extends Base {
  constructor() {
    const likepost = {
      likepost: {
        post_id: "",
        user_id: ""
      }
    };
    super(likepost,"likepost");
  }
}
