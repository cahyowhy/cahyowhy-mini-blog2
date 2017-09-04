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
    return state.user
  },
  userContent: (state) => {
    return state.user.user
  }
};
const mutations = {
  cleanUser(state) {
    state.user = {};
  }
};
export default {
  state,
  getters,
  mutations
}
