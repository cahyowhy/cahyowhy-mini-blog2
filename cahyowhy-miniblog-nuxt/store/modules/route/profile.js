import userService from '~/service/userServive';
const state = () => {
  return {
    id: '',
    user: {}
  }
};
const actions = {
  async fetchProfile({commit}, param){
    const {data} = await new userService().get(param);
    console.log(data);
    commit('setUser', data);
    commit('setId', data.id);
  }
};
const mutations = {
  cleanUser(state) {
    state.user = {};
    state.id = '';
  },
  setId(state, payload){
    state.id = payload;
  },
  setUser(state, payload){
    state.user = payload;
  }
};
export default {
  state,
  actions,
  mutations
}
