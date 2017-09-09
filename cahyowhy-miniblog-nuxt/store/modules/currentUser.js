import Cookie from 'js-cookie'
import loginService from '~/service/loginService';

export const state = () => ({
  user: {},
  access_token: null,
  isLogedIn: false
});

export const mutations = {
  SET_USER: function (state, user) {
    if (user) {
      try {
        state.user = JSON.parse(`${user}`);
      } catch (err) {
        state.user = user;
      }
    }
  },
  SET_ACCESS_TOKEN: function (state, token) {
    state.access_token = token
  },
  SET_IS_LOGGED_IN: function (state, param) {
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
  setToken({commit}, token) {
    if (token) {
      commit('SET_ACCESS_TOKEN', token);
      window.localStorage.setItem('token', token);
      Cookie.set('token', token);
    }
  },
  async doLogin({commit, dispatch}, {param, context}) {
    try {
      const {data} = await new loginService().store(param);
      if (data.httpstatus === 204) {
        dispatch('setToken', data.auth_token);
        dispatch('setUser', data.user);
        commit('SET_IS_LOGGED_IN', true);
      }

      context.showNotification(data.httpstatus);
      setTimeout(function () {
        context.$router.push({name: 'profile-id', params: {id: data.user.id}});
      }, 100);
    } catch (err) {
      context.showNotification(404);
    }
  },
  async checkPassword(context = null, param){
    try {
      const {data} = await new loginService().store(param);
      return data.httpstatus === 204;
    } catch (err) {
      return false;
    }
  },
  setUser({commit}, user) {
    if (user) {
      commit('SET_USER', user);
      window.localStorage.setItem('user', JSON.stringify(user));
      Cookie.set('user', user);
    }
  },
  setLogOut({commit}) {
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
