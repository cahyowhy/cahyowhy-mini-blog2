import userService from '~/service/userService';
const state = () => {
  return {
    id: '',
    user: {}
  }
};
const actions = {
  async fetchProfile({ commit }, param) {
    // const data  = {"httpstatus":200,"id":2,"username":"cahyowhy","name":"cahyowhy","email":"","imageurl":"h1p6kcq01478tkaujlo4aq0k9rgdmmbmyhtjbtmdj3o0drhpvidp74p6qmm7t9obgxfaevr6bt9.jpg.jpg","created_at":"2017-07-15 14:30:04","total_follower":1,"total_following":2,"facebook_id":null};
    const { data } = await new userService().get(param);
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
  setId(state, payload) {
    state.id = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  }
};
export default {
  state,
  actions,
  mutations
}
