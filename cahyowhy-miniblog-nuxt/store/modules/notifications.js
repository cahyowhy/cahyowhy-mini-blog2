import notificationService from '~/service/notificationService';

const state = () => {
  return {
    notificationItems: [],
    /**
     * if no more ajax loaded set empty to true
     */
    isNotificationItemsEmpty: false,
  }
};
const actions = {
  async fetchNotifications({commit}, {param, method}) {
    const {data} = await new notificationService().get(param);
    if (method) {
      /**'
       * for push data
       */
      commit('pushNotification', data);
      console.log(data.length === 0);
      commit('setNotificationIsEmpty', data.length === 0);
    } else {
      /**
       * for set data
       */
      commit('setNotifications', data);
      commit('setNotificationIsEmpty', data.length === 0);
    }
  }
};
const mutations = {
  setNotifications(state, payloads) {
    state.notificationItems = payloads;
  },
  pushNotification(state, payloads) {
    state.notificationItems = state.notificationItems.concat(payloads);
  },
  setNotificationIsEmpty(state, payload){
    state.isNotificationItemsEmpty = payload;
  }
};
export default {
  state,
  mutations,
  actions
}
