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
  isAnyEmpty: (state) => {
    const isTitleEmpty = state.post.title.length === 0;
    const isCategoryEmpty = state.post.category.length === 0;
    const isDescriptionEmpty = state.post.description.length === 0;

    return isTitleEmpty || isCategoryEmpty || isDescriptionEmpty;
  },
  postContent: (state) => {
    return lodash.pickBy(state.post, lodash.identity);
  },
  postDescription: (state) => {
    return state.post.description;
  },
  imagepostDescription: (state) => {
    return JSON.parse(`${JSON.stringify(state.post.imageposts_attributes)}`);
  },
  getContent: (state) => {
    return JSON.parse(`${JSON.stringify(state)}`);
  }
};
const mutations = {
  SET_USER_ID(state, payload){
    state.post.user_id = payload;
  },
  SET_DESCRIPTION(state, payload) {
    state.post.description = payload;
  },
  SET_DESCRIPTION_TEXT(state, payload) {
    state.post.descriptiontext = payload;
  },
  SET_REVIEW(state, payload) {
    state.post.review = payload;
  },
  SET_IMAGEPOST_ATTRIBUTES(state, payload) {
    state.post.imageposts_attributes = payload;
  },
  PUSH_IMAGEPOST_ATTRIBUTES(state, payload) {
    state.post.imageposts_attributes = payload.concat(state.post.imageposts_attributes);
  },
  SET_IMAGES(state, payload) {
    state.post.description = payload;
  },
  ADD_DESCRIPTION(state, payload) {
    state.post.description = state.post.description + payload;
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
