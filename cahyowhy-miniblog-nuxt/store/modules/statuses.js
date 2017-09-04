import statusService from '~/service/statusService';
import commentstatusService from '~/service/commentstatusService';

const state = () => {
  return {
    statusItems: [],
    /**
     * if no more ajax loaded set empty to true
     */
    isStatusItemsEmpty: false
  }
};
const actions = {
  async fetchStatus({commit}, {param, method}) {
    if (method) {
      /**'
       * for push data
       */
      const {data} = await new statusService().get(param);
      commit('pushStatusItems', data);
      commit('setStatusIsEmpty', data.length === 0);
    } else {
      /**
       * for set data
       */
      const {data} = await new statusService().get(param);
      commit('updateStatusItems', data);
      commit('setStatusIsEmpty', data.length === 0);
    }
  },
  async fetchComments({commit}, {param, index}){
    const {data} = await new commentstatusService().get(param);
    commit('updateCommentStatusItems', {data, index});
  }
};
const mutations = {
  updateStatusItems(state, payloads) {
    state.statusItems = payloads;
  },
  updateCommentStatusItems(state, {data, index}){
    if(state.statusItems[index].commentstatuses){
      state.statusItems[index].commentstatuses = data.concat(state.statusItems[index].commentstatuses);
    }
  },
  pushStatusItems(state, payloads) {
    state.statusItems = state.statusItems.concat(payloads);
  },
  setStatusIsEmpty(state, payload){
    state.isStatusItemsEmpty = payload;
  }
};
export default {
  state,
  mutations,
  actions
}
