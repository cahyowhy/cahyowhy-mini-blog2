import {getTokenFromCookie, getTokenFromLocalStorage, getUserFromCookie, getUserFromLocalStorage} from '~/utils/auth'

export default function ({store, redirect, isServer, error, req}) {
  if (isServer && !req) {
    return
  }

  if (req && req.url === '/login') {
    return
  }

  if (!store.state.auth.user) {
    if (!store.state.auth.access_token) {
      const token = isServer ? getTokenFromCookie(req) : getTokenFromLocalStorage();
      const user = isServer ? getUserFromCookie(req) : getUserFromLocalStorage();

      if (!token || !user) {
        store.commit('auth/SET_IS_LOGGED_IN', false);
      } else {
        store.commit('auth/SET_IS_LOGGED_IN', true);
      }

      store.commit('auth/SET_ACCESS_TOKEN', token);
      store.commit('auth/SET_USER', user);
    }
    // if (store.state.auth.access_token && store.state.auth.user) {
    //   console.log("has token me");
    // }
  }
}
