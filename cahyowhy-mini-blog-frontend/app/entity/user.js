import Base from './base';
export default class User extends Base {
  constructor() {
    const user = {
      user: {
        name: "",
        username: "",
        imageurl: "",
        password: '',
        facebook_id: '',
      }
    };
    super(user, "user");
  }
}
