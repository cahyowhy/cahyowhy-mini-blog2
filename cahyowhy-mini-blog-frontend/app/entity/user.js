import Base from './base';
export default class User extends Base {
  constructor() {
    const user = {
      user: {
        name: "",
        username: "",
        imageurl: "",
        password: '',
        email: '',
        facebook_id: '',
      }
    };
    super(user, "user");
  }
}
