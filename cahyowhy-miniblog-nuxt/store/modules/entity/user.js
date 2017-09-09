import userService from '~/service/userService';
const lodash = require('lodash');

const state = () => {
  return {
    user: {
      name: "",
      username: "",
      imageurl: "",
      password: '',
      email: '',
      facebook_id: '',
    }
  }
};

const getters = {
  user: (state) => {
    return {
      user: lodash.pickBy(state.user, lodash.identity)
    };
  },
  userContent: (state) => {
    return lodash.pickBy(state.user, lodash.identity);
  },
  userPassword: (state) => {
    return {
      user: {
        password: state.user.password
      }
    }
  }
};
const mutations = {
  cleanUser(state) {
    state.user = {};
  }
};
const actions = {
  async update(self = null, {body, param, context}){
    const {data} = await new userService().update(body, param);
    context.showNotification(data.httpstatus);
    return data;
  }
};
export default {
  state,
  getters,
  mutations,
  actions
}
