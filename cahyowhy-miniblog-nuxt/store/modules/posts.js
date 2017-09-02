import postService from '~/service/postService';

const state = () => {
  return {
    postItems: [],
    postItemCategory: null,
    /**
     * if no more ajax loaded set empty to true
     */
    isPostItemEmpty: false,
    postDetail: null,
    postId: null
  }
};
const actions = {
  async fetchPost({commit}, {param, type, method}) {
    if (method) {
      /**'
       * for push data
       */
      const {data} = await new postService().get(param);
      if (type === "POST_ITEMS") {
        commit('pushPostItems', data);
        commit('setPostItemEmpty', data.length === 0);
      }
    } else {
      /**
       * for set data
       */
      const {data} = await new postService().get(param);
      if (type === "POST_ITEMS") {
        commit('updatePostItems', data);
        commit('setPostItemEmpty', data.length === 0);
      } else if (type === "POST_DETAIL") {
        commit('updatePostDetail', data);
      }
    }
  }
};
const mutations = {
  updatePostItems(state, payloads) {
    state.postItems = payloads;
  },
  pushPostItems(state, payloads) {
    state.postItems = state.postItems.concat(payloads);
  },
  updatePostDetail(state, payloads) {
    state.postDetail = payloads;
  },
  setPostId(state, payload){
    state.postId = payload;
  },
  setPostCategory(state, payload){
    state.postItemCategory = payload;
  },
  setPostItemEmpty(state, payload){
    state.isPostItemEmpty = payload;
  }
};
export default {
  state,
  mutations,
  actions
}
