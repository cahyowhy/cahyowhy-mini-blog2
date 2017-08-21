import Base from './base';
export default class CommentPost extends Base {
  constructor() {
    const commentpost = {
      commentpost: {
        post_id: "",
        user_id: "",
        comment: "",
      }
    };
    super(commentpost, "commentpost");
  }
}
