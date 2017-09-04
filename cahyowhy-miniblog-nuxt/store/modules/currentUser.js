import Cookie from 'js-cookie'

export const state = () => ({
  user: {},
  access_token: null,
  isLogedIn: false
});

export const mutations = {
  SET_USER: function(state, user) {
    if (user) {
      state.user = JSON.parse(user);
    }
  },
  SET_ACCESS_TOKEN: function(state, token) {
    state.access_token = token
  },
  SET_IS_LOGGED_IN: function(state, param) {
    state.isLogedIn = param;
  }
};

export const getters = {
  user: state => {
    return state.user
  },
  access_token: state => {
    return state.access_token
  }
};

export const actions = {
  setToken({ commit }, token) {
    if (token) {
      commit('SET_ACCESS_TOKEN', token);
      window.localStorage.setItem('token', token);
      Cookie.set('token', token);
    }
  },
  setUser({ commit }, user) {
    if (user) {
      commit('SET_USER', user);
      window.localStorage.setItem('user', JSON.stringify(user));
      Cookie.set('user', user);
    }
  },
  setLogOut({ commit }) {
    commit('SET_USER', {});
    commit('SET_ACCESS_TOKEN', '');
    commit('SET_IS_LOGGED_IN', false);
    window.localStorage.setItem('token', '');
    Cookie.set('token', '');
    window.localStorage.setItem('user', '');
    Cookie.set('user', '');
  }
};

export default {
  state,
  mutations,
  getters,
  actions
}
