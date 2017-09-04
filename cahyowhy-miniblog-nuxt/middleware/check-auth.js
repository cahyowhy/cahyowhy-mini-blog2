import {getTokenFromCookie, getTokenFromLocalStorage, getUserFromCookie, getUserFromLocalStorage} from '~/utils/auth'
import axios from 'axios';

export default function ({store, redirect, isServer, error, req}) {
  if (isServer && !req) {
    return
  }

  if (req && req.url === '/login') {
    return
  }

  if (!store.state.auth.user || !store.state.auth.access_token) {
    const token = isServer ? getTokenFromCookie(req) : getTokenFromLocalStorage();
    const user = isServer ? getUserFromCookie(req) : getUserFromLocalStorage();

    axios({
      method: 'GET',
      url: process.env.APP.API_AUTH,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(function (result) {
      if (result.data.status === 204) {
        store.commit('auth/SET_IS_LOGGED_IN', token && user);
        store.commit('auth/SET_ACCESS_TOKEN', token);
        store.commit('auth/SET_USER', user);
      }
    });
  }
}
