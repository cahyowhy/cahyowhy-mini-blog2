import Base from './base';
export default class CommentStatus extends Base {
  constructor() {
    const commentstatus = {
      commentstatus: {
        status_id: "",
        user_id: "",
        comment: "",
      }
    };
    super(commentstatus,"commentstatus");
  }
}
