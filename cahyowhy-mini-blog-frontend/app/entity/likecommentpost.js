import Base from './base';
export default class LikeCommentPost extends Base {
  constructor() {
    const likecommentpost = {
      likecommentpost: {
        post_id: "",
        user_id: "",
        commentpost_id: "",
      }
    };
    super(likecommentpost);
  }
}
