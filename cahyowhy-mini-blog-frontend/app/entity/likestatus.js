import Base from './base';
export default class LikeStatus extends Base {
  constructor() {
    const likestatus = {
      likestatus: {
        status_id: "",
        user_id: "",
        emoticons: ""
      }
    };
    super(likestatus);
  }
}
