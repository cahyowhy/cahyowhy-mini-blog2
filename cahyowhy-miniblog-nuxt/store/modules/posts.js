import postService from '~/service/postService';
import commentpostService from '~/service/commentpostService';

const state = () => {
  return {
    postItems: [],
    /**
     * use it on create-post.vue
     * to fetch all post category
     */
    categories: [],
    /**
     * use it in post.vue
     * for load post by category
     */
    postItemCategory: null,
    /**
     * if no more ajax loaded set empty to true
     */
    isPostItemEmpty: false,
    isCommentPostsEmpty: false,
    postDetail: null,
    postId: null,
    commentposts: []
  }
};
const actions = {
  async fetchPost({commit}, {param, type, method, categories}) {
    /**
     * if categories
     */
    const {data} = await new postService().get(param);
    if (categories) {
      commit('setCategories', data);
    } else {
      if (method) {
        /**'
         * for push data
         */
        if (type === "POST_ITEMS") {
          commit('pushPostItems', data);
          commit('setPostItemEmpty', data.length === 0);
        }
      } else {
        /**
         * for set data
         */
        if (type === "POST_ITEMS") {
          commit('updatePostItems', data);
          commit('setPostItemEmpty', data.length === 0);
        } else if (type === "POST_DETAIL") {
          commit('updatePostDetail', data);
        }
      }
    }
  },
  async fetchCommentPost({commit}, {param, method}) {
    /**
     * if categories
     */
    const {data} = await new commentpostService().get(param);
    if (method) {
      commit('pushCommentposts', data);
    } else {
      commit('updateCommentposts', data);
    }

    commit('setCommentPostsEmpty', data.length === 0)
  },
  async save(self = null, {context, payload}){
    const {data} = await new postService().store(payload);
    if (data.httpstatus === 201) {
      context.showNotification(data.httpstatus);
      context.$router.push(`/post-detail/${data.id}`);
    } else {
      context.showNotification(401);
    }
  },
  async saveCommentPost({commit}, {context, payload}){
    const {data} = await new commentpostService().store(payload);
    if (data.httpstatus === 201) {
      context.showNotification(data.httpstatus);
      commit('pushCommentposts', [data]);
    } else {
      context.showNotification(401);
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
  updateCommentposts(state, payloads) {
    state.commentposts = payloads;
  },
  pushCommentposts(state, payloads) {
    state.commentposts = state.commentposts.concat(payloads);
  },
  setCategories(state, payloads) {
    state.categories = payloads;
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
  },
  setCommentPostsEmpty(state, payload){
    state.isCommentPostsEmpty = payload;
  }
};
export default {
  state,
  mutations,
  actions
}
