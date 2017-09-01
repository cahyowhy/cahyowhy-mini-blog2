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
  updatePostItems(state, payloads) {
    state.postItems = payloads;
  },
  updatePostDetail(state, payloads) {
    state.postDetail = payloads;
  },
  setPostId(state, payload){
    state.postId = payload;
  }
};
export default {
  state,
  mutations,
  actions
}
