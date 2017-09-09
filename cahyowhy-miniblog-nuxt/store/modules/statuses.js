import statusService from '~/service/statusService';
import commentstatusService from '~/service/commentstatusService';

const state = () => {
  return {
    statusItems: [],
    /**
     * if no more ajax loaded set empty to true
     */
    isStatusItemsEmpty: false,
    /**
     * no more comment to load
     */
    isCommentMax: []
  }
};
const actions = {
  async fetchStatus({commit}, {param, method}) {
    const {data} = await new statusService().get(param);
    console.log(data);
    if (method) {
      /**'
       * for push data
       */
      commit('pushStatusItems', data);
      commit('setStatusIsEmpty', data.length === 0);
    } else {
      /**
       * for set data
       */
      commit('updateStatusItems', data);
      commit('setStatusIsEmpty', data.length === 0);
    }

    data.forEach(function (item, index) {
      commit('setIsCommentMax', {payload: item.commentstatuses.length === 0, index})
    });
  },
  async fetchComments({commit}, {param, index}){
    const {data} = await new commentstatusService().get(param);
    commit('updateCommentStatusItems', {data, index});
    commit('setIsCommentMax', {payload: data.length === 0, index})
  }
};
const mutations = {
  updateStatusItems(state, payloads) {
    state.statusItems = payloads;
  },
  updateCommentStatusItems(state, {data, index}){
    if (state.statusItems[index].commentstatuses) {
      state.statusItems[index].commentstatuses = data.concat(state.statusItems[index].commentstatuses);
    }
  },
  pushStatusItems(state, payloads) {
    state.statusItems = state.statusItems.concat(payloads);
  },
  setStatusIsEmpty(state, payload){
    state.isStatusItemsEmpty = payload;
  },
  setIsCommentMax(state, {payload, index}){
    state.isCommentMax[index] = payload;
  }
};
export default {
  state,
  mutations,
  actions
}
