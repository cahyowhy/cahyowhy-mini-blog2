import postService from '~/service/postService';
const lodash = require('lodash');

const state = () => {
  return {
    post: {
      user_id: '',
      title: "",
      category: "",
      imageposts_attributes: [],
      description: '',
      review: '',
      descriptiontext: ''
    }
  }
};

const getters = {
  post: (state) => {
    return {
      post: lodash.pickBy(state.post, lodash.identity)
    };
  },
  postContent: (state) => {
    return lodash.pickBy(state.post, lodash.identity);
  }
};
const mutations = {
  SET_USER_ID(state, payload){
    state.post.user_id = payload;
  },
  SET_DESCRIPTION(state, payload) {
    state.post.imageposts_attributes = payload;
  },
  SET_IMAGES(state, payload) {
    state.post.description = payload;
  }
};
const actions = {
  async update(self = null, {body, param, context}){
    const {data} = await new postService().update(body, param);
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
