import postService from '~/service/postService';

const state = () => {
  return {postItems: [], postDetail: null, postId: null}
};
const actions = {
  async fetchPost({commit}, {param, type}) {
    const {data} = await new postService().get(param);
    if (type === "POST_ITEMS") {
      commit('updatePostItems', data);
    } else if (type === "POST_DETAIL") {
      commit('updatePostDetail', data);
    }
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
