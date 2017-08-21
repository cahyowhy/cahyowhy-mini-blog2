import Base from './base';
export default class Post extends Base {
  constructor() {
    const post = {
      post: {
        user_id: '',
        title: "",
        category: "",
        imageposts_attributes: [],
        description: '',
        review: '',
        descriptiontext: ''
      }
    };
    super(post);
  }
}
