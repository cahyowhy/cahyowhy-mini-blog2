import imageService from '~/service/imageServive';

const state = () => {
  return {
    imageItems: [],
    /**
     * if no more ajax loaded set empty to true
     */
    isImageEmpty: false,
  }
};
const actions = {
  async fetchImages({commit}, {param, method}) {
    const {data} = await new imageService().get(param);
    if (method) {
      /**'
       * for push data
       */
      commit('pushImage', data);
      commit('setImageIsEmpty', data.length === 0);
    } else {
      /**
       * for set data
       */
      commit('setImages', data);
      commit('setImageIsEmpty', data.length === 0);
    }
  }
};
const mutations = {
  setImages(state, payloads) {
    state.imageItems = payloads;
  },
  pushImage(state, payloads) {
    state.imageItems = state.imageItems.concat(payloads);
  },
  setImageIsEmpty(state, payload){
    state.isImageEmpty = payload;
  }
};
export default {
  state,
  mutations,
  actions
}
