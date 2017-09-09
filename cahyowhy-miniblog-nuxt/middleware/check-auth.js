import { getTokenFromCookie, getTokenFromLocalStorage, getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'
import axios from 'axios';
import authService from '~/service/authService';

export default function({ store, redirect, isServer, error, req }) {
  if (isServer && !req) {
    return
  }

  if (req && req.url === '/login') {
    return
  }

  if (!store.state.auth.user || !store.state.auth.access_token) {
    const token = isServer ? getTokenFromCookie(req) : getTokenFromLocalStorage();
    const user = isServer ? getUserFromCookie(req) : getUserFromLocalStorage();

    if (user && token) {
      store.commit('auth/SET_IS_LOGGED_IN', true);
      store.commit('auth/SET_ACCESS_TOKEN', token);
      store.commit('auth/SET_USER', user);
      new authService().get().then(function(result) {
        if (!result.data.status === 204) {
          store.commit('auth/SET_IS_LOGGED_IN', false);
          store.commit('auth/SET_ACCESS_TOKEN', null);
          store.commit('auth/SET_USER', {});
        }
      });
    }
  }
}
